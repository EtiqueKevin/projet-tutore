<?php

namespace apiCours\core\domain\entities\module;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\module\ModuleDTO;

class Module extends Entity{

    protected string $name;
    protected string $idCreator;
    protected string $description;
    protected int $nblesson;
    protected ?string $dateupdate;

    public function __construct(string $name, string $idCreator, string $description, int $nblesson, ?string $dateupdate){
        $this->name = $name;
        $this->idCreator = $idCreator;
        $this->description = $description;
        $this->nblesson = $nblesson;
        $this->dateupdate = $dateupdate;
    }

    public function toDTO(){
        return new ModuleDTO($this->id, $this->name, $this->idCreator, $this->description, $this->nblesson, $this->dateupdate);
    }

    public function setDateUpdate(?string $dateupdate): void{
        $this->dateupdate = $dateupdate;
    }

}
