<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class EmailVerificationController extends Controller
{
   /**
     * Verify the user's email address.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request): JsonResponse
    {

        $id = $request->input('id');
        $hash = $request->input('hash');

        $user = User::findOrFail($id);

        if (!hash_equals(sha1($user->email), $hash)) {
            return $this->sendError('Invalid verification link.',[], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return $this->sendError('Email already verified.',[], 409);
        }

        $user->markEmailAsVerified();

        event(new Verified($user));

        $user->sendVerifyEmailSuccessNotification(); // Send notification

        return $this->sendResponse([], 'Email successfully verified.');
    }

    /**
     * Resend email verification link
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resend_email_verification(Request $request): JsonResponse
    {
        try{
            $request->validate(['email' => 'required|email']);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return $this->sendError('User not found.',[], 404);
            }

            if ($user->hasVerifiedEmail()) {
                return $this->sendError('Email already verified.',[], 409);
            }

            $user->sendVerifyEmailNotification(); // Send notification

            return $this->sendResponse([], 'Verification link sent!');
        }catch(\Exception $e){ // Using a generic exception
            return $this->sendError('Unable to send verification email. Please try again later.',[], 500);
        }
    }

    /**
     * Request email change
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function email_change_request(Request $request): JsonResponse
    {
        try{
            $request->validate(['email' => 'required|email']);

            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return $this->sendError('User not found.',[], 404);
            }

            if (!$user->hasVerifiedEmail()) {
                return $this->sendError('Email not yet verified.',[], 400);
            }

            $user->sendEmailChangeNotification($user->id, $request->email); // Send notification

            return $this->sendResponse([], 'Email change request email sent!');
        }catch(\Exception $e){ // Using a generic exception
            return $this->sendError('Unable to send verification email. Please try again later.',[], 500);
        }
    }

    /**
     * Change email
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function email_change(Request $request): JsonResponse
    {
        try{
            $id = $request->input('id');
            $hash = $request->input('hash');
            $request->validate(['email' => 'required|email']);

            $user = User::find($id);
            if (!$user) {
                return $this->sendError('User not found.',[], 404);
            }

            if (!hash_equals(sha1($user->email), $hash)) {
                return $this->sendError('Invalid verification code.',[], 400);
            }

            if (!$user->hasVerifiedEmail()) {
                return $this->sendError('Email not yet verified.',[], 400);
            }

            $user->email = $request->input('email');
            $user->email_verified_at = null;
            $user->save();

            if (!$user->hasVerifiedEmail()) {
                $user->sendVerifyEmailNotification(); // Send notification
                return $this->sendResponse([], 'Email change request email sent!');
            }else{
                return $this->sendError('Unable to change email. Please try again later.',[], 500);
            }
        }catch(\Exception $e){ // Using a generic exception
            return $this->sendError('Unable to change email. Please try again later.',[], 500);
        }
    }
}
