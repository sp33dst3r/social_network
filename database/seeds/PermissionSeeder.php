<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\Permission;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('permissions')->insertOrIgnore(
            [
                [
                    'name' => 'canManageUsers',
                    'description' => 'can manage all simple users',
                ],
                [
                    'name' => 'canManageModerators',
                    'description' => 'can manage all website moderators',
                ],
                [
                    'name' => 'canManageComments',
                    'description' => 'can manage all messages',
                ],

                [
                    'name' => 'canManageGroups',
                    'description' => 'can manage all messages',
                ],

            ]
        );


        // add relations

        $roles = Role::all();
        $canManageUsers =  Permission::where('name', "canManageUsers")->first()->id;
        $canManageModerators =  Permission::where('name', "canManageModerators")->first()->id;
        $canManageComments =  Permission::where('name', "canManageComments")->first()->id;
        $canManageGroups =  Permission::where('name', "canManageGroups")->first()->id;
        foreach($roles as $role){
            if($role->name == 'admin'){

                $role->permissions()->attach([$canManageUsers, $canManageModerators, $canManageComments, $canManageGroups]);
            }
            if($role->name == 'moderator'){

                $role->permissions()->attach([$canManageUsers, $canManageComments, $canManageGroups]);
            }
            if($role->name == 'group_owner'){

                $role->permissions()->attach([$canManageComments, $canManageGroups]);
            }

        }
    }
}
