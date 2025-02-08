<?php

namespace apiAuth\core\services\auth;


use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\UserDTO;

interface AuthServiceInterface
{
    function verifyCredentials(InputUserDTO $input): UserDTO;
}