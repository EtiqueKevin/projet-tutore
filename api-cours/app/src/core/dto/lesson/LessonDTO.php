<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\dto\DTO;

class LessonDTO extends DTO implements \JsonSerializable
{
    private ?string $id;
    private string $name;
    private string $type;
    private string $description;
    private array $content;

    public function __construct(?string $id, string $name, string $type, array $content, string $description)
    {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
        $this->description = $description;
        foreach ($content as $c) {
            $this->content[] = $c->toDTO();
        }
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'content' => $this->content
        ];
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

    public function getId(): ?string
    {
        return $this->id;
    }
}