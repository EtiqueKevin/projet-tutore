<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\dto\user\UserDTO;

interface UsersServiceInterface{

    public function getUsersId(string $id): UserDTO;

}