<?php

namespace apiAuth\core\dto\user;

use apiAuth\core\dto\DTO;

class InputUserDTO extends DTO
{
    protected string $email;
    protected string $password;
    protected ?string $pseudo;

    public function __construct(string $email, string $password, string $pseudo = null) {
        $this->email = $email;
        $this->password = $password;
        $this->pseudo = $pseudo;
    }
}