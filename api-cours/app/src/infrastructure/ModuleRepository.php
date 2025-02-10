<?php

namespace apiCours\infrastructure;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\domain\entities\module\Module;
use Ramsey\Uuid\Uuid;

class ModuleRepository implements ModuleRepositoryInterface {



    public function getAllModules()
    {
        $module1 = new ModuleDTO("1", "Module 1", "1", "Description module 1", 10, "2021-10-10");
        $module2 = new ModuleDTO("2", "Module 2", "2", "Description module 2", 20, "2021-10-10");
        $module3 = new ModuleDTO("3", "Module 3", "3", "Description module 3", 30, "2021-10-10");

        return [$module1, $module2, $module3];
    }

    public function getModuleById(string $id)
    {
        // TODO: Implement getModuleById() method.
    }

    public function createModule(Module $module)
    {
        $module->setID("2");
        return $module;
    }

    public function updateModule(Module $module)
    {
        // TODO: Implement updateModule() method.
    }

    public function deleteModule(string $id)
    {
        // TODO: Implement deleteModule() method.
    }
}