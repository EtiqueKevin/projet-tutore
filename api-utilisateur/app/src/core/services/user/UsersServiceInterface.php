<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\dto\user\UserDTO;

interface UsersServiceInterface{

    public function getUsersId(string $id): UserDTO;
    function findByEmail(string $email):User | null;
    function save(User $auth): string;
    function findById(string $id):User;

}