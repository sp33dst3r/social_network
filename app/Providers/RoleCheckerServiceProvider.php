<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Role\RoleChecker;
use Illuminate\Foundation\Application;

class RoleCheckerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->singleton(RoleChecker::class, function (Application $app) {
            return new RoleChecker();
          });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
