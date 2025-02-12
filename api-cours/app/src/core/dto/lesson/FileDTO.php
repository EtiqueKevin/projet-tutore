<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class FileDTO extends DTO
{
    public string $type;
    public string $language;
    public string $content;

    public function __construct(string $type, string $language, string $content){
        $this->type = $type;
        $this->language = $language;
        $this->content = $content;
    }

    public function jsonSerialize(): array
    {
        return [
            'type' => $this->type,
            'language' => $this->language,
            'content' => $this->content,
        ];
    }
}