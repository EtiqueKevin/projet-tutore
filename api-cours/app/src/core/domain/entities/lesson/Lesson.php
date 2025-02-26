<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\LessonDTO;

class Lesson extends Entity
{
    private string $name;
    private string $type;
    private string $description;
    private array $content;

    private string $dateUpdate;

    public function __construct(string $name, string $type, array $content, string $description, string $dateUpdate)
    {
        $this->name = $name;
        $this->type = $type;
        $this->content = $content;
        $this->description = $description;
        $this->dateUpdate = $dateUpdate;
    }

    public function toDTO(): LessonDTO
    {
        $contentDTO = [];
        foreach ($this->content as $content) {
            $contentDTO[] = $content->toDTO();
        }
        return new LessonDTO($this->id, $this->name, $this->type, $this->content, $this->description, $this->dateUpdate);
    }
}