<?php

namespace apiCours\core\repositoryInterface;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\domain\entities\module\Module;
use Ramsey\Uuid\Uuid;

interface ModuleRepositoryInterface{
    public function getAllModules();
    public function getModuleById(string $id);
    public function createModule(Module $module);
    public function updateModule(Module $module);
    public function deleteModule(string $id);
}