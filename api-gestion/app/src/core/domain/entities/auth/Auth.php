<?php

namespace apiGestion\core\domain\entities\auth;


use apiGestion\core\domain\entities\Entity;

class Auth extends Entity
{
    protected string $email;
    protected int $role;
    protected string $password;

    public function __construct(string $ID, string $email, string $password, int $role)
    {
        $this->ID = $ID;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
    }

    public function toDTO(): AuthDTO
    {
        return new AuthDTO($this->ID, $this->email, $this->role);
    }
}