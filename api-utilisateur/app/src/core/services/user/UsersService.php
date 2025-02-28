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
        $role = $this->repositoryAuth->getRoleById($id);
        $user->setRole($role);
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

    function getUsers(): array
    {
        $users = $this->repositoryUsers->getUsers();
        $usersDTO = [];
        foreach ($users as $user){
            $role = $this->repositoryAuth->getRoleById($user->getID());
            $email = $this->repositoryAuth->getEmailById($user->getID());
            $user->setRole($role);

            $usersDTO[] = $user->toDTO();
        }
        return $usersDTO;
    }

    function finishLesson(string $idUser, string $idLesson, $token): void
    {
        try {
            $this->repositoryUsers->finishLesson($idUser, $idLesson);
            $id_module = $this->repositoryCours->getModuleByLesson($idLesson, $token);
            $lessonsIds = $this->repositoryCours->getLessonsIdsByModule($id_module, $token);
            $nbLesson = count($lessonsIds);
            $countTerminer = 0;
            foreach ($lessonsIds as $id){
                if($this->repositoryUsers->getLessonStatusById($id) == 1){
                    $countTerminer++;
                }
            }
            if($countTerminer == $nbLesson){
                $this->repositoryUsers->updateStatusModule($idUser, $id_module, 1);
            }
        }catch (\Exception $e){
            throw new \Exception('Impossible de terminer le cours: '.$e->getMessage());
        }
    }

    function startLesson(string $idUser, string $idLesson, $token): void
    {
        try {
            $id_module = $this->repositoryCours->getModuleByLesson($idLesson, $token);
            $lessonsIds = $this->repositoryCours->getLessonsIdsByModule($id_module, $token);
            $commenceCount = 0;
            $terminerCount = 0;
            $nbLesson = count($lessonsIds);
            foreach ($lessonsIds as $id){
                if ($this->repositoryUsers->getLessonStatusById($id) == 0){
                    $commenceCount++;
                }elseif ($this->repositoryUsers->getLessonStatusById($id) == 1){
                    $terminerCount++;
                }
            }

            if ($commenceCount > 1 && $terminerCount < $nbLesson){
                $this->repositoryUsers->updateStatusModule($idUser, $id_module, 0);
            }

            $this->repositoryUsers->startLesson($idUser, $idLesson);

        }catch (\Exception $e){
            throw new \Exception('Impossible de commencer le cours: '.$e->getMessage());
        }
    }

    public function getModuleStatusByUser(string $id): array{
        try{
            return $this->repositoryUsers->getModuleStatusByUser($id);
        }catch (\Exception $e){
            throw new \Exception('Impossible de trouver l\'utilisateur: '.$e->getMessage());
        }
    }

    public function getLessonStatusByUser(string $id): array{
        try {
            return $this->repositoryUsers->getLessonStatusByUser($id);
        }catch (\Exception $e){
            throw new \Exception('Impossible de trouver l\'utilisateur: '.$e->getMessage());
        }
    }

    public function getLessonStatusById(string $id): int
    {
        try {
            return $this->repositoryUsers->getLessonStatusById($id);
        }catch (\Exception $e){
            throw new \Exception('Impossible de trouver l\'utilisateur: '.$e->getMessage());
        }
    }

    public function getModuleStatusById(string $id): int
    {
        try {
            return $this->repositoryUsers->getModuleStatusById($id);
        }catch (\Exception $e){
            throw new \Exception('Impossible de trouver l\'utilisateur: '.$e->getMessage());
        }
    }

    function rateModule(string $idUser, string $idModule, int $rate): void
    {
        try {
            $this->repositoryUsers->rateModule($idUser, $idModule, $rate);
        }catch (\Exception $e){
            throw new \Exception('Impossible de noter le module: '.$e->getMessage());
        }
    }

    function getRateOfModule(string $idModule): int
    {
        try {
            return $this->repositoryUsers->getRateModule($idModule);
        }catch (\Exception $e){
            throw new \Exception('Impossible de noter le module: '.$e->getMessage());
        }
    }
}