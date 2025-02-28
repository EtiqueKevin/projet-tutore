<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\ErreurDTO;

class Erreur extends Entity {

    protected $id_lesson;

    protected array $errors = [];

    public function __construct(string $id_lesson, array $e){
        $this->id_lesson = $id_lesson;
        $this->errors = $e;
    }

    public function getErrors(): array {
        return $this->errors;
    }

    public function toDTO(): ErreurDTO{
        return new ErreurDTO($this->id_lesson, $this->errors);
    }

}