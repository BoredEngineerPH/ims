<?php
namespace App\Http\Controllers\API;

use App\Models\User;

use App\Http\Controllers\Controller;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Register api
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'middle_name' => 'nullable',
            'last_name' => 'nullable',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        try {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);

            $token_name = $request->input('first_name') ;
            $token_name = $token_name.($request->has('middle_name') ? '-'.$request->input('middle_name') : '');
            $token_name = $token_name.($request->has('last_name') ? '-'.$request->input('last_name') : '');
            $token_name = Str::slug($token_name);
            $success['token'] =  $user->createToken($token_name)->plainTextToken;
            $success['first_name'] =  $user->first_name;
            $success['middle_name'] =  isset($user->middle_name) ? $user->middle_name : '';
            $success['last_name'] =  isset($user->last_name) ? $user->last_name : '';
            $success['email'] =  $user->email;

            // event(new Registered($user));

            $user->sendVerifyEmailNotification();

            return $this->sendResponse($success, 'User registered successfully.');
        } catch (UniqueConstraintViolationException $e) {
            return $this->sendError('User with that email already exists.',[], 406);
        } catch (Exception $e) {
            return $this->sendError('Unknown Error while processing you Request.',[], 500);
        }
    }

    /**
     * Login api
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $credentials = request(['email', 'password']);
            if (!$token = auth()->attempt($credentials)) {
                return $this->sendError('Invalid email and password.', [], 403);
            }
            $success = $this->respondWithToken($token);
            return $this->sendResponse($success, 'User login successfully.');
        } catch (UniqueConstraintViolationException $e) {
            return $this->sendError('User with that email already exists.',[], 406);
        } catch (Exception $e) {
            return $this->sendError('Unknown Error while processing you Request.',[], 500);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return $this->sendResponse([], 'Successfully logged out.');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(): JsonResponse
    {
        $success = $this->respondWithToken(auth()->refresh());

        return $this->sendResponse($success, 'Refresh token return successfully.');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(): JsonResponse
    {
        $success = User::getCurrentUser();

        return $this->sendResponse($success, 'Refresh token return successfully.');
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return array
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
