<?php

namespace apiAuth\core\services\user;

use apiAuth\core\domain\entities\user\User;
use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\UserDTO;
use apiAuth\core\repositoryInterface\AuthRepositoryInterface;
use apiAuth\core\repositoryInterface\UtilisateurRepositoryInterface;
use apiAuth\core\services\user\UserServiceException;
use apiAuth\core\services\user\UserServiceInterface;
use PHPUnit\Exception;


class UserService implements UserServiceInterface
{
    private AuthRepositoryInterface $authRepository;

    private UtilisateurRepositoryInterface $utilisateurRepository;

    public function __construct(AuthRepositoryInterface $authRepository, UtilisateurRepositoryInterface $utilisateurRepository)
    {
        $this->authRepository = $authRepository;
        $this->utilisateurRepository = $utilisateurRepository;
    }

    public function createUser(InputUserDTO $input): void
    {

        try {
            $user = $this->authRepository->findByEmail($input->email);
        } catch (Exception $e) {
            throw new UserServiceException('Erreur lors de la recherche de l\'utilisateur');
        }
        if ($user) {
            throw new UserServiceException('Utilisateur déjà existant');
        }

        $id = "";
        try {
            $user = new User(
                $input->email,
                password_hash($input->password, PASSWORD_DEFAULT),
                0
            );
            $id = $this->authRepository->save($user);
        } catch (\Exception $e) {
            throw new UserServiceException('Erreur lors de la création de l\'utilisateur' . $e->getMessage());
        }

        try{
            if($id != ""){
                $u = new User($input->email,$input->password,0,$input->name,$input->surname,$input->linkpic,$input->pseudo);
                $u->setId($id);
                $this->utilisateurRepository->createUtilisateur($u);
            }
        }catch (Exception $e){
            throw new UserServiceException($e->getMessage());
        }

    }

    public function findUserById(string $ID): UserDTO
    {
        try {
            $user = $this->authRepository->findById($ID);
            if (!$user) {
                throw new UserServiceException('Utilisateur introuvable');
            }
            return $user->toDTO();
        } catch (\Exception $e) {
            throw new UserServiceException('Erreur lors de la recherche de l\'utilisateur');
        }
    }
}