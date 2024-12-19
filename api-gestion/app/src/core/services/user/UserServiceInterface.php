<?php

namespace apiGestion\core\services\user;

use apiGestion\core\dto\user\UserDTO;

interface UserServiceInterface
{
    public function getUserById(int $id): UserDTO;
}