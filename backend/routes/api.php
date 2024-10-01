<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EmailVerificationController;
use App\Http\Controllers\API\PasswordResetController;
use App\Http\Controllers\API\UserController;

Route::group(['prefix' => 'auth'], function ($router) {

    Route::group(['middleware' => 'guest'], function ($router) {
        Route::group(['prefix' => 'email'], function ($router) {
            // Email verification
            Route::post('/verify',[EmailVerificationController::class, 'verify'])
                ->name('verification.verify');

            // Resend email verification
            Route::post('/verification-resend', [EmailVerificationController::class, 'resend_email_verification'])
                ->middleware(['throttle:6,1'])
                ->name('verification.email_resend');

                // Email verification
            Route::post('/change-request',[EmailVerificationController::class, 'email_change_request'])
                ->middleware(['throttle:6,1'])
                ->name('verification.verify');

            Route::post('/change',[EmailVerificationController::class, 'email_change'])
                ->middleware(['throttle:6,1'])
                ->name('verification.verify');
        });

        Route::group(['prefix' => 'password'], function ($router) {
            // Forgot password
            Route::post('/forgot', [PasswordResetController::class, 'forgot'])
                ->middleware(['user_verified'])
                ->name('password.forgot');

            // Reset password
            Route::post('/reset', [PasswordResetController::class, 'reset'])
                ->name('password.reset');
        });
    });

    // Register
    Route::post('/register', [AuthController::class, 'register'])
        ->name('register');

    // Login
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware(['user_verified'])
        ->name('login');

    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])
        ->middleware([ 'auth:api', 'user_verified'])
        ->name('logout');

    // Session refreshg
    Route::post('/refresh', [AuthController::class, 'refresh'])
        ->middleware([ 'auth:api', 'user_verified'])
        ->name('refresh');

    // Profile
    Route::post('/profile', [AuthController::class, 'profile'])
        ->middleware(['auth:api', 'user_verified'])
        ->name('profile');
});

Route::group(['middleware' => ['auth:api', 'user_verified']], function ($router) {
    Route::resource('users', UserController::class)
        ->middleware(['can:admin,manage user']);
    Route::get('/current-user', [UserController::class, 'current'])
        ->name('users.current');

});

