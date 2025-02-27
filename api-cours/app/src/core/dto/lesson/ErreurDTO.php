<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class ErreurDTO extends DTO
{
    protected array $errors = [];

    public function __construct(array $errors){
        $this->errors = $errors;
    }

    public function getErrors(): array{
        return $this->errors;
    }

    public function jsonSerialize(): array
    {
        return $this->errors;
    }



}