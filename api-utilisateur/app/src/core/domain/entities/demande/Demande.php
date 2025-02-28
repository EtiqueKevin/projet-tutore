<?php

namespace apiUtilisateur\core\domain\entities\demande;

use apiUtilisateur\core\domain\entities\Entity;
use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\dto\demande\DemandeDTO;

class Demande extends Entity
{
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function toDTO(): DemandeDTO
    {
        return new DemandeDTO($this->getID() , $this->user->toDTO());
    }
}