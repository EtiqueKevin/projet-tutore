<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\ErreurDTO;

class Erreur extends Entity {

    protected array $errors = [];

    public function __construct(array $e){
        $this->errors = $e;
    }

    public function getErrors(): array {
        return $this->errors;
    }

    public function toDTO(): ErreurDTO{
        return new ErreurDTO($this->errors);
    }

}