<?php

namespace apiUtilisateur\core\domain\entities\user;

use apiUtilisateur\core\domain\entities\Entity;

class UserConnexion extends Entity
{
    protected string $email;
    protected string $password;
    protected int $role;

    public function __construct(string $email, string $password, int $role)
    {
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
    }

    public function toDTO(): UserDTO
    {
        return new UserDTO($this);
    }
}