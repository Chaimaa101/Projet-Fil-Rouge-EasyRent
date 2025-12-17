<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * Example usage:
     * ->middleware('role:admin')
     * ->middleware('role:animator,user')
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = Auth::user();

        if (! $user) {
            return response()->json(['message' => 'Non autorisé.'], 401);
        }

        // Check if user has one of the required roles
        if (! in_array($user->role, $roles)) {
            return response()->json(['message' => 'Interdit. Vous n \'avez pas accès à cette ressource.'], 403);
        }

        return $next($request);
    }
}
