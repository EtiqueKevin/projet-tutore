<?php

namespace apiDB\core\services\user;

use apiDB\core\dto\user\UserDTO;
use apiDB\core\repositoryInterface\RepositoryInterfaceUsers;

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