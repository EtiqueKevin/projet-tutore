<?php

namespace apiAuth\core\dto\user;

use apiAuth\core\dto\DTO;

class ProviderUserDTO extends DTO
{
    protected string $email;
    protected string $password;

    public function __construct(string $email, string $password){
        $this->email = $email;
        $this->password = $password;
    }

}