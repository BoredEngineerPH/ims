<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class IsUserVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if($request->has('email')){
            $user = User::where('email', $request->input('email'))->first();
        }elseif($request->has('id')){
            $user = User::find($request->input('id'));
        }else{
            $user = Auth::user();
        }

        if ($user) {
            if(!$user->hasVerifiedEmail()){
                return response()->json([
                    'success' => false,
                    'message' => 'Email not yet verified.',
                ], 400);
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Invalid user.',
            ], 400);
        }
        return $next($request);
    }
}
