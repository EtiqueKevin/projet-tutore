<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\dto\DTO;

class LessonDTO extends DTO
{
    private ?string $id;
    private string $title;
    private string $description;
    private array $content;

    public function __construct(?string $id, string $title, string $description, array $content)
    {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->content = $content;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content
        ];
    }

    public function toEntity(): Lesson {
        $lesson = new Lesson($this->title, $this->description, $this->content);
        if ($this->id !== null)
        $lesson->setId($this->id);
        return $lesson;
    }

    public function setId(?string $id): void
    {
        $this->id = $id;
    }

    public function getId(): ?string
    {
        return $this->id;
    }
}