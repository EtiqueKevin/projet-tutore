<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class FileDTO extends DTO
{
    public string $type;
    public string $language;
    public string $content;
    public string $filename;

    public function __construct(string $type,string $filename, string $language, string $content){
        $this->type = $type;
        $this->language = $language;
        $this->content = $content;
        $this->filename = $filename;
    }

    public function jsonSerialize(): array
    {
        return [
            'type' => $this->type,
            'filename' => $this->filename,
            'language' => $this->language,
            'content' => $this->content,
        ];
    }
}