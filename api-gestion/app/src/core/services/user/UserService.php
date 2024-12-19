<?php

namespace apiGestion\core\services\user;

use apiGestion\core\dto\user\UserDTO;
use apiGestion\core\repositoryInterface\UserRepositoryInterface;

class UserService implements UserServiceInterface
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUserById(int $id): UserDTO
    {
        $user = $this->userRepository->getUserById($id);
        return $user->toDTO();
    }
}