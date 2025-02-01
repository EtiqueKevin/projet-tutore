<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class LessonDTO extends DTO
{
    private string $title;
    private string $description;
    private array $content;

    public function __construct(int $id, string $title, string $description, array $content)
    {
        $this->title = $title;
        $this->description = $description;
        $this->content = $content;
    }

    public function jsonSerialize(): array
    {


        return [
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content
        ];
    }
}