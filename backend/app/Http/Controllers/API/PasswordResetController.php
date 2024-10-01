<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Notifications\ResetPassword;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class PasswordResetController extends Controller
{

    /**
     * Forgot password and sends reset link
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgot(Request $request): JsonResponse
    {

        try{
            // Validate the request
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->errors(),[], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return $this->sendError('User not found.',[], 404);
            }

            // Generate a password reset token
            $token = Password::createToken($user);

            $user->sendResetPasswordNotification($token); // Send notification

            return $this->sendResponse([], 'Password reset link sent.');
        }catch(\Exception $e){ // Using a generic exception
            return $this->sendError('Unable to send reset link. Please check the email provided.',[], 500);
        }
    }

    /**
     * Handle the password reset request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(),[], 422);
        }

        // Attempt to reset the user's password
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                // Update the user's password
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        // Return the appropriate response
        return $status === Password::PASSWORD_RESET
            ? $this->sendResponse([], 'Password has been reset successfully.')
            : $this->sendError('Failed to reset password.',[], 400);
    }
}
