<?php

namespace apiUtilisateur\core\domain\entities\user;

use apiUtilisateur\core\domain\entities\Entity;
use apiUtilisateur\core\dto\user\UserDTO;
use DateTime;

class User extends Entity{
    protected string $name;
    protected string $surname;
    protected ?string $linkpic;
    protected ?string $pseudo;

    public function __construct(string $name,string $surname, string $linkpic, ?string $pseudo){
        $this->name = $name;
        $this->surname = $surname;
        $this->linkpic = $linkpic;
        $this->pseudo = $pseudo;

    }

    public function toDTO():UserDTO{
        return new UserDTO($this);
    }

}