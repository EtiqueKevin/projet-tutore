<?php

namespace apiDB\core\services\user;

use apiDB\core\dto\user\UserDTO;

interface UsersServiceInterface{

    public function getUsersId(string $id): UserDTO;

}