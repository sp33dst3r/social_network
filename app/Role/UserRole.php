<?php

namespace App\Role;

/***
 * Class UserRole
 * @package App\Role
 */
class UserRole {

    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_USER = 'user';
    const ROLE_GUEST = 'ROLE_GUEST';



    /***
     * @return array
     */
    public static function getRoleList()
    {
        return [
            static::ROLE_ADMIN =>'Admin',
            static::ROLE_USER => 'user',
            static::ROLE_GUEST => 'Account Manager',

        ];
    }

}
