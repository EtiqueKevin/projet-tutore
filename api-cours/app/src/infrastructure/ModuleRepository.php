<?php

namespace apiCours\infrastructure;

use apiCours\core\repositoryInterface\ModuleRepositoryException;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\domain\entities\module\Module;
use apiCours\core\repositoryInterface\ModuleRepositoryNotFoundException;
use apiCours\core\services\UUIDConverter\UUIDConverter;
use DateTime;
use MongoDB\BSON\Regex;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Collection;
use MongoDB\Database;
use Ramsey\Uuid\Uuid;


class ModuleRepository implements ModuleRepositoryInterface {

    private Database $db;
    private Collection $moduleCollection;

    private Collection $moduleLessonCollection;

    public function __construct(Database $db)
    {
        $this->db = $db;
        $this->moduleCollection = $this->db->selectCollection("modules");
        $this->moduleLessonCollection = $this->db->selectCollection("module_lessons");
    }


    public function getAllModules(string $nameSearch, string $descriptionSearch)
    {
        try {
            $modulesData = $this->moduleCollection->find(['name' => new Regex($nameSearch, 'i'), 'description' => new Regex($descriptionSearch,'i')]);
            if ($modulesData->isDead()) {
                return [];
            }
        }catch (\Exception $e){
            throw new ModuleRepositoryException($e->getMessage());
        }

        try {

            foreach ($modulesData as $module) {
                $uuid = UUIDConverter::fromUUID($module->_id);
                $id_creator = UUIDConverter::fromUUID($module->id_creator);
                $date = $module->date_update->toDateTime()->getTimestamp();
                $m = new Module($module->name, $id_creator, $module->description, $module->nblesson, date("d/m/Y", $date));
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
            $date = $module->date_update->toDateTime()->getTimestamp();
            $m = new Module($module->name, $id_creator, $module->description, $module->nblesson, date("d/m/Y", $date));
            $m->setID($id);
            return $m;
        }catch (\Exception $e) {
            throw new ModuleRepositoryException("Impossible de trouver le module.");
        }
    }

    public function createModule(Module $module)
    {
        try {
            $date = date("d/m/Y");
            $res = $this->moduleCollection->insertOne([
                "_id" => UUIDConverter::toUUID(Uuid::uuid4()->toString()),
                "name" => $module->name,
                "id_creator" => UUIDConverter::toUUID($module->idCreator),
                "description" => $module->description,
                "nblesson" => $module->nblesson,
                "date_update" => new UTCDateTime((new DateTime())->getTimestamp() * 1000)
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
            $date = date("d/m/Y");
            $this->moduleCollection->updateOne(["_id" => UUIDConverter::toUUID($module->getID())], ['$set' => [
                "name" => $module->name,
                "id_creator" => UUIDConverter::toUUID($module->idCreator),
                "description" => $module->description,
                "nblesson" => $module->nblesson,
                "date_update" => new UTCDateTime((new DateTime())->getTimestamp() * 1000)
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

    public function liaisonModuleLesson(string $idLesson, string $idModule):void{
        try{

            $this->moduleLessonCollection->insertOne(["_id" => UUIDConverter::toUUID(Uuid::uuid4()->toString()),"id_module"=> UUIDConverter::toUUID($idModule), "id_lesson"=> UUIDConverter::toUUID($idLesson)]);
            $m = $this->getModuleById($idModule);
            $this->moduleCollection->updateOne(["_id" => UUIDConverter::toUUID($idModule)], ['$inc' => [
                "nblesson" => +1,
            ]]);
        }catch (\Exception $e){
            throw new ModuleRepositoryException("Erreur lors de liaison module / lesson : " . $e->getMessage());
        }
    }

    public function getModuleByLessonId(string $idLesson)
    {
      $moduleId = $this->moduleLessonCollection->findOne(["id_lesson" => UUIDConverter::toUUID($idLesson)], ["id_module"]);
      $module = $this->moduleCollection->findOne(["_id" => $moduleId->id_module]);
      return new Module($module->name, $module->id_creator, $module->description, $module->nblesson, $module->date_update);
    }

    public function decrementationModuleLesson(string $idModule):void{
        try{
            $this->moduleCollection->updateOne(["_id" => UUIDConverter::toUUID($idModule)], ['$inc' => [
                "nblesson" => -1,
            ]]);
        }catch (\Exception $e){
            throw new ModuleRepositoryException("Erreur lors de la decrementation module / lesson : " . $e->getMessage());
        }
    }
}