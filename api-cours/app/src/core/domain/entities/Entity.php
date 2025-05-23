<?php

namespace apiCours\core\domain\entities;


abstract class Entity
{

    protected ?string $id=null;

    /**
     * @throws \Exception
     */
    public function __get(string $name): mixed
    {
        return property_exists($this, $name) ? $this->$name : throw new \Exception(static::class . ": Property $name does not exist");
    }

    public function setID(?string $ID): void
    {
        $this->id = $ID;
    }

    public function getID(): ?string
    {
        return $this->id;
    }

}