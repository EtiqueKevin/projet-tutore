<?php

namespace apiAuth\core\services\user;

use apiAuth\core\domain\entities\user\User;
use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\UserDTO;
use apiAuth\core\repositoryInterface\AuthRepositoryInterface;
use apiAuth\core\services\user\UserServiceException;
use apiAuth\core\services\user\UserServiceInterface;
use PHPUnit\Exception;


class UserService implements UserServiceInterface
{
    private AuthRepositoryInterface $authRepository;


    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function createUser(InputUserDTO $input): void
    {
        try {
            $user = $this->authRepository->findByEmail($input->email);
        } catch (Exception) {
            throw new UserServiceException('Erreur lors de la recherche de l\'utilisateur');
        }
        if ($user) {
            throw new UserServiceException('Utilisateur déjà existant');
        }
        try {
            $user = new User(
                $input->email,
                password_hash($input->password, PASSWORD_DEFAULT),
                0
            );
            $this->authRepository->save($user);
        } catch (\Exception $e) {
            throw new UserServiceException('Erreur lors de la création de l\'utilisateur' . $e->getMessage());
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