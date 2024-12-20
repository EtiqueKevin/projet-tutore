<?php

namespace apiGestion\core\domain\entities\lesson;

use apiGestion\core\domain\entities\Entity;
use apiGestion\core\dto\lesson\LessonDTO;

class Lesson extends Entity
{
    private string $title;
    private string $description;
    private array $content;

    public function __construct(string $title, string $description, array $content)
    {
        $this->title = $title;
        $this->description = $description;
        $this->content = $content;
    }

    public function toDTO(): LessonDTO
    {
        $contentDTO = [];
        foreach ($this->content as $content) {
            $contentDTO[] = $content->toDTO();
        }
        return new LessonDTO($this->id, $this->title, $this->description, $contentDTO);
    }
}