<?php

namespace apiCours\core\dto\module;

use apiCours\core\dto\DTO;
use apiCours\core\domain\entities\module\Module;

class ModuleDTO extends DTO{

    private ?string $id;
    private string $name;
    protected string $idCreator;
    protected string $description;
    protected int $nblesson;
    protected string $dateupdate;

    public function __construct(?string $id, string $name, string $idCreator, string $description, int $nblesson, string $dateupdate){
        $this->id = $id;
        $this->name = $name;
        $this->idCreator = $idCreator;
        $this->description = $description;
        $this->nblesson = $nblesson;
        $this->dateupdate = $dateupdate;
    }

    public function getId(): ?string{
        return $this->id;
    }

    public function setId(?string $id): void{
        $this->id = $id;
    }

    public function toEntity(){
        $module = new Module($this->name, $this->idCreator, $this->description, $this->nblesson, $this->dateupdate);
        $module->setId($this->id);
        return $module;
    }
}