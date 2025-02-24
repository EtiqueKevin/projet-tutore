<?php

namespace apiCours\infrastructure;

use apiCours\core\repositoryInterface\ModuleRepositoryException;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\domain\entities\module\Module;
use apiCours\core\repositoryInterface\ModuleRepositoryNotFoundException;
use apiCours\core\services\UUIDConverter\UUIDConverter;
use MongoDB\Collection;
use MongoDB\Database;
use Ramsey\Uuid\Uuid;


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
        try {
            $modulesData = $this->moduleCollection->find();
            if ($modulesData == null) {
                throw new ModuleRepositoryNotFoundException("Aucun module trouvé.");
            }
            foreach ($modulesData as $module) {
                $uuid = UUIDConverter::fromUUID($module->_id);
                $id_creator = UUIDConverter::fromUUID($module->id_creator);
                $m = new Module($module->name, $id_creator, $module->description, $module->nblesson, $module->date_update);
                $m->setID($uuid);
                $modules[] = $m;
            }
            return $modules;
        }catch(\Exception $e) {
            throw new ModuleRepositoryException("Impossible de récupérer les modules.");
        }
    }

    public function getModuleById(string $id)
    {
        try {
            $idUUID = UUIDConverter::toUUID($id);
            $module = $this->moduleCollection->findOne(["_id" => $idUUID]);
            if ($module == null) {
                throw new ModuleRepositoryNotFoundException("Aucun module trouvé.");
            }
            $id_creator = UUIDConverter::fromUUID($module->id_creator);
            $m = new Module($module->name, $id_creator, $module->description, $module->nblesson, $module->date_update);
            $m->setID($id);
            return $m;
        }catch (\Exception $e) {
            throw new ModuleRepositoryException("Impossible de trouver le module.");
        }
    }

    public function createModule(Module $module)
    {
        try {
            $date = date("Y-m-d H:i:s");
            $res = $this->moduleCollection->insertOne([
                "_id" => UUIDConverter::toUUID(Uuid::uuid4()->toString()),
                "name" => $module->name,
                "id_creator" => UUIDConverter::toUUID($module->idCreator),
                "description" => $module->description,
                "nblesson" => $module->nblesson,
                "date_update" => $date
            ]);
            $module->setID(UUIDConverter::fromUUID($res->getInsertedId()));
            $module->setDateUpdate($date);
            return $module;
        }catch(\Exception $e) {
            throw new ModuleRepositoryException("Impossible de créer le module.");
        }
    }

    public function updateModule(Module $module)
    {
        try {
            $date = date("Y-m-d H:i:s");
            $this->moduleCollection->updateOne(["_id" => UUIDConverter::toUUID($module->getID())], ['$set' => [
                "name" => $module->name,
                "id_creator" => UUIDConverter::toUUID($module->idCreator),
                "description" => $module->description,
                "nblesson" => $module->nblesson,
                "date_update" => $date
            ]]);
        }catch (\Exception $e) {
            throw new ModuleRepositoryException("Impossible de modifier le module. " . $e->getMessage());
        }
    }

    public function deleteModule(string $id)
    {
        try {
            $this->moduleCollection->deleteOne(["_id" => UUIDConverter::toUUID($id)]);
        }catch (\Exception $e) {
            throw new ModuleRepositoryException("Impossible de supprimer le module");
        }
    }

    public function changeToJohnDoe(string $id)
    {
        try {
            $this->moduleCollection->updateMany(["id_creator" => UUIDConverter::toUUID($id)], ['$set' => ["id_creator" => null]]);
        }catch (\Exception $e) {
            throw new ModuleRepositoryException("Impossible de changer le créateur du module.");
        }
    }
}