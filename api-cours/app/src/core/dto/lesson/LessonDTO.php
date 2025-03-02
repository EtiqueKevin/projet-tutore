<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\dto\DTO;
use Ramsey\Uuid\Uuid;

class LessonDTO extends DTO implements \JsonSerializable
{
    private ?string $id;
    private string $name;
    private string $type;
    private string $description;
    private array $content;

    private ?string $dateUpdate;

    private ?int $status = null;

    public function __construct(?string $id, string $name, string $type, array $content, string $description, ?string $dateUpdate = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
        $this->description = $description;

        if($content['0'] instanceof Entity){
            foreach ($content as $c) {
                $this->content[] = $c->toDTO();
            }
        }
        else{
            $this->content = $content;
        }
        $this->dateUpdate = $dateUpdate;
    }

    public function jsonSerialize(): array
    {

        $ct = [];
        foreach ($this->content as $c) {
            $ct[] = $c->jsonSerialize();
        }
        if($this->status !== null){
            return [
                "id" => $this->id,
                "name" => $this->name,
                "type" => $this->type,
                "description" => $this->description,
                "dateUpdate" => $this->dateUpdate,
                "status" => $this->status,
                "content" => $ct
            ];
        }

        if($this->id == null){
            return [
                'id' => Uuid::uuid4()->toString(),
                'name' => $this->name,
                'description' => $this->description,
                'type' => $this->type,
                'content' => $ct,
                'date_update' => $this->dateUpdate
            ];
        }else{
            return [
                'id' => $this->id,
                'name' => $this->name,
                'description' => $this->description,
                'type' => $this->type,
                'content' => $ct,
                'date_update' => $this->dateUpdate
            ];
        }

    }

    public function toEntity(): Lesson {
        $lesson = new Lesson($this->name,$this->type,$this->content, $this->description);
        if ($this->id !== null)
        $lesson->setId($this->id);
        return $lesson;
    }

    public function setId(?string $id): void
    {
        $this->id = $id;
    }

    public function setStatus(?int $status): void{
        $this->status = $status;
    }

    public function getId(): ?string
    {
        return $this->id;
    }
}