<?php

namespace apiUtilisateur\core\dto\demande;

use apiUtilisateur\core\dto\DTO;
use apiUtilisateur\core\dto\user\UserDTO;

class DemandeDTO extends DTO
{
    private string $id;
    private UserDTO $user;

    public function __construct(string $id ,UserDTO $user)
    {
        $this->id = $id;
        $this->user = $user;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user
        ];
    }
}