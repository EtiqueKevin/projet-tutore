<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\dto\user\UserDTO;
use apiUtilisateur\core\repositoryInterface\RepositoryInterfaceUsers;

class UsersService implements UsersServiceInterface{

    private RepositoryInterfaceUsers $repositoryUsers;

    public function __construct(RepositoryInterfaceUsers $repositoryUsers){
        $this->repositoryUsers = $repositoryUsers;
    }

    public function getUsersId(string $id): UserDTO{

        $user = $this->repositoryUsers->getUserById($id);

        return $user->toDTO();

    }

}