<?php

namespace apiCours\infrastructure;

use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\domain\entities\module\Module;
use apiCours\core\services\UUIDConverter\UUIDConverter;
use MongoDB\Collection;
use MongoDB\Database;


class ModuleRepository implements ModuleRepositoryInterface {

    private Database $db;
    private Collection $moduleCollection;

    public function __construct(Database $db)
    {
        $this->db = $db;
        $this->moduleCollection = $this->db->selectCollection("modules");
    }


    public function getAllModules()
    {
        $modulesData = $this->moduleCollection->find();
        foreach ($modulesData as $module) {
            $uuid = UUIDConverter::fromUUID($module->_id);
            $id_creator = UUIDConverter::fromUUID($module->id_creator);
            $m = new Module($module->name, $id_creator, $module->description, $module->nblesson, $module->date_update);
            $m->setID($uuid);
            $modules[] = $m;
        }
        return $modules;
    }

    public function getModuleById(string $id)
    {
        $idUUID = UUIDConverter::toUUID($id);
        $module = $this->moduleCollection->findOne(["_id" => $idUUID]);
        $id_creator = UUIDConverter::fromUUID($module->id_creator);
        $m = new Module($module->name, $id_creator, $module->description, $module->nblesson, $module->date_update);
        $m->setID($id);
        return $m;
    }

    public function createModule(Module $module)
    {
        $module->setID("2");
        return $module;
    }

    public function updateModule(Module $module)
    {

    }

    public function deleteModule(string $id)
    {

    }
}