<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class ErreurDTO extends DTO
{
    protected string $id_lesson;
    protected array $errors = [];

    public function __construct(string $id_lesson, array $errors){
        $this->errors = $errors;
        $this->id_lesson = $id_lesson;
    }

    public function getErrors(): array{
        return $this->errors;
    }

    public function jsonSerialize(): array
    {
        return $this->errors;
    }



}