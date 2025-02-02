<?php

namespace apiCours\core\services\module;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use Ramsey\Uuid\Uuid;

class ModuleService implements ModuleServiceInterface
{
    private ModuleRepositoryInterface $moduleRepository;

    public function __construct(ModuleRepositoryInterface $moduleRepository)
    {
        $this->moduleRepository = $moduleRepository;
    }

    #[\Override] public function getAllModules()
    {
        $modules = $this->moduleRepository->getAllModules();
        return $modules;
    }

    #[\Override] public function getModuleById(Uuid $id)
    {
        // TODO: Implement getModuleById() method.
    }

    #[\Override] public function createModule(array $module)
    {
        // TODO: Implement createModule() method.
    }

    #[\Override] public function updateModule(Uuid $id, ModuleDTO $module)
    {
        // TODO: Implement updateModule() method.
    }

    #[\Override] public function deleteModule(Uuid $id)
    {
        // TODO: Implement deleteModule() method.
    }
}