<?php

namespace apiAuth\core\domain\entities\user;

use apiAuth\core\domain\entities\Entity;
use apiAuth\core\dto\user\UserDTO;

class User extends Entity
{
    protected string $email;
    protected int $role;
    protected string $password;
    protected ?string $name;
    protected ?string $surname;
    protected ?string $linkpic;
    protected ?string $pseudo;

    public function __construct(string $email, string $password, int $role, ?string $name = null, ?string $surname = null, ?string $linkpic = null, ?string $pseudo = null)
    {
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
        $this->name = $name;
        $this->surname = $surname;
        $this->linkpic = $linkpic;
        $this->pseudo = $pseudo;
    }

    public function toDTO(): UserDTO
    {
        return new UserDTO($this->ID, $this->email, $this->role);
    }

}