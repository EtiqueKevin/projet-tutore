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
    protected ?string $dateupdate;
    protected ?int $status = null;
    protected ?float $rate = null;

    public function __construct(?string $id, string $name, string $idCreator, string $description, int $nblesson, ?string $dateupdate){
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

    public function setStatus(int $status): void{
        $this->status = $status;
    }

    public function setRate(float $rate): void{
        $this->rate = $rate;
    }

    public function toEntity(){
        $module = new Module($this->name, $this->idCreator, $this->description, $this->nblesson, $this->dateupdate);
        $module->setId($this->id);
        return $module;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'idCreator' => $this->idCreator,
            'description' => $this->description,
            'nblesson' => $this->nblesson,
            'dateupdate' => $this->dateupdate,
            'status' => $this->status,
            'note' => $this->rate
        ];
    }
}