<?php

namespace apiUtilisateur\application\providers\auth;

use apiUtilisateur\application\actions\user\providers\auth\InputUserDTO;
use apiUtilisateur\application\actions\user\providers\auth\UserDTO;

interface AuthProviderInterface
{
    public function signIn(InputUserDTO $credentials): UserDTO;
    public function getSignIn(string $token): UserDTO;
}