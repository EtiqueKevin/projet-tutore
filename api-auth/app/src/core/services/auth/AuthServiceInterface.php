<?php

namespace apiAuth\core\services\auth;


use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\ProviderUserDTO;
use apiAuth\core\dto\user\UserDTO;

interface AuthServiceInterface
{
    function verifyCredentials(ProviderUserDTO $input): UserDTO;
    function updateRole(string $id, string $role): void;

}