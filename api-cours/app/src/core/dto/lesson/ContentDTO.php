<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class ContentDTO extends DTO
{
    private string $type;
    private ?string $text;
    private ?string $link;

    public function __construct(string $type, ?string $text, ?string $link)
    {
        $this->type = $type;
        $this->text = $text;
        $this->link = $link;
    }

    public function jsonSerialize(): array
    {
        return [
            'type' => $this->type,
            'text' => $this->text,
            'link' => $this->link
        ];
    }
}