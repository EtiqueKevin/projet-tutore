<?php

namespace apiAuth\core\services\user;

use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\UserDTO;

interface UserServiceInterface
{
    public function findUserById(string $ID): UserDTO;
    public function createUser(InputUserDTO $input): void;
    public function deleteUser(string $ID): void;
    public function getRoleById(string $ID): string;
    public function getEmailByRole(string $ID): string;
}