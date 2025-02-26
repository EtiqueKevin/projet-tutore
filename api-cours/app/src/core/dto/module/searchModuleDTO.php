<?php

namespace apiCours\core\dto\module;

use apiCours\core\dto\DTO;

class searchModuleDTO extends DTO
{

    public ?string $name;
    public ?string $description;
    public ?string $id_creater;

    public ?string $token;

    public function __construct(?string $name = '', ?string $description = '', ?string $token = ''){
        $this->name = $name;
        $this->description = $description;
        $this->token = $token;
    }

    public function setCreater(string $creater):void{
        $this->id_creater = $creater;
    }



}