<?php
namespace apiAuth\application\providers\auth;


use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\UserDTO;

interface AuthProviderInterface
{
    public function signIn(InputUserDTO $credentials): UserDTO;

    public function getSignIn(string $token): UserDTO;

    public function getPlayerID(string $token): string;
}