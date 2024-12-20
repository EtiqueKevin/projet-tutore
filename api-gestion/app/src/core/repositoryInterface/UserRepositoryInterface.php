<?php

namespace apiGestion\core\repositoryInterface;

use apiGestion\core\domain\entities\user\User;

interface UserRepositoryInterface{

    function getUserByID($userID): User;

}