<?php

namespace apiAuth\core\dto\user;

use apiAuth\core\dto\DTO;

class InputUserDTO extends DTO
{
    protected string $email;
    protected string $password;
    protected string $name;
    protected string $surname;
    protected ?string $pseudo;
    protected string $linkpic;

    public function __construct(string $email, string $password, string $name, string $surname, string $linkpic, ?string $pseudo) {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->surname = $surname;
        $this->linkpic = $linkpic;
        $this->pseudo = $pseudo;

    }
}