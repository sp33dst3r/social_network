<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });


        /* \DB::table('users')->insert(
            array(
                'name' => 'admin',
                'description' => 'administrator of site'
            ),
            array(
                'name' => 'moderator',
                'description' => 'can moderate posts, ban or delete users'
            ),
            array(
                'name' => 'group_owner',
                'description' => 'can moderate posts in his groups'
            ),
            array(
                'name' => 'user',
                'description' => 'simple user'
            )
        ); */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
