<?php

namespace apiDB\core\domain\entities\user;

use apiDB\core\domain\entities\Entity;
use apiDB\core\dto\user\UserDTO;
use DateTime;

class User extends Entity{
    protected string $name;
    protected string $surname;
    protected int $role;
    protected ?string $linkpic;
    protected string $email;
    protected DateTime $datesignup;
    protected DateTime $datesignin;

    public function __construct(string $name,string $surname, int $role, string $linkpic, string $email, DateTime $datesignin, DateTime $datesign){
        $this->name = $name;
        $this->surname = $surname;
        $this->role = $role;
        $this->linkpic = $linkpic;
        $this->email = $email;
        $this->datesignin = $datesignin;
        $this->datesignup = $datesign;
    }

    public function toDTO():UserDTO{
        return new UserDTO($this);
    }

}