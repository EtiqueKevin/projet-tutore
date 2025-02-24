<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\dto\user\InputUserDTO;
use apiUtilisateur\core\dto\user\UserDTO;
use apiUtilisateur\core\repositoryInterface\AuthRepositoryInterface;
use apiUtilisateur\core\repositoryInterface\CoursRepositoryInterface;
use apiUtilisateur\core\repositoryInterface\UsersRepositoryInterface;

class UsersService implements UsersServiceInterface{

    private UsersRepositoryInterface $repositoryUsers;
    private AuthRepositoryInterface $repositoryAuth;
    private CoursRepositoryInterface $repositoryCours;

    public function __construct(UsersRepositoryInterface $repositoryUsers, AuthRepositoryInterface $repositoryAuth, CoursRepositoryInterface $repositoryCours){
        $this->repositoryUsers = $repositoryUsers;
        $this->repositoryAuth = $repositoryAuth;
        $this->repositoryCours = $repositoryCours;
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

    function deleteUser(string $id): void
    {
        try {
            $this->repositoryUsers->deleteUser($id);
            $this->repositoryAuth->suppUtilisateurById($id);
        }catch (\Exception $e){
            throw new \Exception('Impossible de supprimer l\'utilisateur: '.$e->getMessage());
        }
    }

    function changeToJohnDoe(string $id): void
    {
        try {
            $this->repositoryCours->changeToJohnDoe($id);
        }catch (\Exception $e){
            throw new \Exception('Impossible de changer l\'utilisateur en John Doe: '.$e->getMessage());
        }
    }
}