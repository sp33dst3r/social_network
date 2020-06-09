<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('roles')->insertOrIgnore(
            [
            [
                'name' => 'admin',
            ],
            [
                'name' => 'moderator',
            ],
            [
                'name' => 'group_owner',
            ],
            [
                'name' => 'user',
            ],
            ]
        );
    }
}
