<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\dto\user\UserDTO;
use apiUtilisateur\core\repositoryInterface\UsersRepositoryInterface;

class UsersService implements UsersServiceInterface{

    private UsersRepositoryInterface $repositoryUsers;

    public function __construct(UsersRepositoryInterface $repositoryUsers){
        $this->repositoryUsers = $repositoryUsers;
    }

    public function getUsersId(string $id): UserDTO{

        $user = $this->repositoryUsers->getUserById($id);

        return $user->toDTO();

    }

}