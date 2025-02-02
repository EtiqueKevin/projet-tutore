<?php

namespace apiUtilisateur\core\dto\user;

use apiUtilisateur\core\dto\DTO;

class UserConnexionInputDTO extends DTO
{
    protected string $email;
    protected string $password;

    public function __construct(string $email, string $password) {
        $this->email = $email;
        $this->password = $password;
    }

}