<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\dto\user\InputUserDTO;
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

    function save(InputUserDTO $inpputUserDTO): void
    {
        $user = new User($inpputUserDTO->name,$inpputUserDTO->surname,$inpputUserDTO->linkpic, $inpputUserDTO->pseudo);
        $user->setID($inpputUserDTO->id);
        $this->repositoryUsers->save($user);
    }

    function update(InputUserDTO $inputUserDTO): void
    {
        $user = new User($inputUserDTO->name,$inputUserDTO->surname,$inputUserDTO->linkpic, $inputUserDTO->pseudo);
        $user->setID($inputUserDTO->id);
        $this->repositoryUsers->update($user);
    }

}