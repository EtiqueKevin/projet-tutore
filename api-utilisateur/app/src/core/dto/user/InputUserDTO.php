<?php

namespace apiUtilisateur\core\dto\user;

use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\dto\DTO;
use DateTime;
use Ramsey\Uuid\Uuid;

class InputUserDTO extends DTO{
    protected string $id;
    protected string $name;
    protected string $surname;
    protected ?string $linkpic;
    protected ?string $pseudo;
    protected ?int $role;

    public function __construct(string $id, string $name, string $surname, string $linkpic, ?string $pseudo, int $role = 0){
        $this->id = $id;
        $this->name = $name;
        $this->surname = $surname;
        $this->linkpic = $linkpic;
        $this->pseudo = $pseudo;
        $this->role = $role;
    }

}