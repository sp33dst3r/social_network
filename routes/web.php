<?php

use Illuminate\Support\Facades\Route;
use App\Role\UserRole;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
   // var_dump(\App\Role\UserRole::ROLE_FINANCE);
    return view('welcome');

});

 Route::get('/profile', function () {
    //
})->middleware('check_user_role:' . \App\Role\UserRole::ROLE_USER);

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
