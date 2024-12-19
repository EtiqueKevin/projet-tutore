<?php

namespace apiGestion\core\domain\entities\user;

use apiGestion\core\domain\entities\Entity;
use apiGestion\core\dto\user\UserDTO;

class User extends Entity{
    protected string $name;
    protected string $surname;
    protected string $role;
    protected string $linkpic;
    protected string $email;
    protected string $datesignup;
    protected string $datesignin;

    public function __construct(string $name,string $surname, string $role, string $linkpic, string $email, string $datesignin, string $datesign){
        $this->name = $name;
        $this->surname = $surname;
        $this->role = $role;
        $this->linkpic = $linkpic;
        $this->email = $email;
        $this->datesignin = $datesignin;
        $this->datesignup = $datesign;
    }

    public function toDTO(): UserDTO{
        return new UserDTO($this->id, $this->name, $this->surname, $this->role, $this->linkpic, $this->email, $this->datesignin, $this->datesignup);
    }

}