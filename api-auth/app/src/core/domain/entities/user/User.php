<?php

namespace apiAuth\core\domain\entities\user;

use apiAuth\core\domain\entities\Entity;
use apiAuth\core\dto\user\UserDTO;

class User extends Entity
{
    protected string $email;
    protected int $role;
    protected string $password;

    public function __construct(string $email, string $password, int $role)
    {
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
    }

    public function toDTO(): UserDTO
    {
        return new UserDTO($this->ID, $this->email, $this->role);
    }

}