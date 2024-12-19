<?php
namespace apiGestion\application\providers\auth;

interface AuthProviderInterface
{
    public function signIn(InputAuthDTO $credentials): AuthDTO;

    public function getSignIn(string $token): AuthDTO;
}