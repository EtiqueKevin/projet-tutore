<?php
namespace apiAuth\application\actions\application\providers\auth;


use apiAuth\core\dto\user\ProviderUserDTO;
use apiAuth\core\dto\user\UserDTO;

interface AuthProviderInterface
{
    public function signIn(ProviderUserDTO $put): UserDTO;

    public function getSignIn(string $token): UserDTO;

    public function getPlayerID(string $token): string;
}