<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

          Gate::define('is-owner', function (User $user, $model) {

   if ($user->role === 'admin') {
            return Response::allow();
        }
    if (property_exists($model, 'user_id') && $model->user_id === $user->id) {
        return Response::allow();
    }

    return Response::deny("Vous n'êtes pas le propriétaire de cette ressource.");
});

    
    }
}
