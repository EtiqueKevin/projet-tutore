<?php

namespace apiCours\core\dto\module;

use apiCours\core\dto\DTO;

class searchModuleDTO extends DTO
{

    public ?string $name;
    public ?string $description;

    public function __construct(?string $name = '', ?string $description = ''){
        $this->name = $name;
        $this->description = $description;
    }



}