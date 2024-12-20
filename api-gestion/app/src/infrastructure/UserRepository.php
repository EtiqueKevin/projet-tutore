<?php

namespace apiGestion\infrastructure;

use apiGestion\core\domain\entities\user\User;
use apiGestion\core\repositoryInterface\UserRepositoryInterface;
use DateTime;

class UserRepository implements UserRepositoryInterface
{

    function getUserByID($userID): User
    {
        $user = new User("jean", "brito", 1, "linkpic", "jean@brito.fr", new DateTime(), new DateTime());
        $user->setID("skibidi toilet");
        return $user;
    }
}