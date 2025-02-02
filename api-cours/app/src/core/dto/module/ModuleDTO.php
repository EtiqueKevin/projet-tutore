<?php

namespace apiCours\core\dto\module;

use apiCours\core\dto\DTO;

class ModuleDTO extends DTO{

    private string $id;
    private string $name;
    protected string $idCreator;
    protected string $description;
    protected string $nblesson;
    protected string $dateupdate;

    public function __construct(string $id, string $name, string $idCreator, string $description, string $nblesson, string $dateupdate){
        $this->id = $id;
        $this->name = $name;
        $this->idCreator = $idCreator;
        $this->description = $description;
        $this->nblesson = $nblesson;
        $this->dateupdate = $dateupdate;
    }
}