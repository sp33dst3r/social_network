<?php

namespace App\Http\Middleware;
use App\Role\RoleChecker;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use Closure;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    protected $roleChecker;

    public function __construct(RoleChecker $roleChecker)
    {

        $this->roleChecker = $roleChecker;
    }
    public function handle($request, Closure $next, $role)
    {
        $user = Auth::guard()->user();


        //dd($this->roleChecker->check($user, $role));

        if (!$user || ! $this->roleChecker->check($user, $role)) {
            throw new AuthorizationException('You do not have permission to view this page');
        }



        return $next($request);
    }
}
