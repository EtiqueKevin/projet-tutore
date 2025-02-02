<?php

namespace apiCours\core\repositoryInterface;

use apiCours\core\dto\module\ModuleDTO;
use Ramsey\Uuid\Uuid;

interface ModuleRepositoryInterface{
    public function getAllModules();
    public function getModuleById(Uuid $id);
    public function createModule(array $module);
    public function updateModule(Uuid $id, ModuleDTO $module);
    public function deleteModule(Uuid $id);
}