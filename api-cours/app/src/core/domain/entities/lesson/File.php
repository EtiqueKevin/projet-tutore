<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\FileDTO;

class File extends Entity
{
    protected string $type;
    protected string $filename;
    protected string $language;
    protected string $content;

    public function __construct(string $type, string $filename, string $language, string $content){
        $this->type = $type;
        $this->filename = $filename;
        $this->language = $language;
        $this->content = $content;
    }

    public function toDTO(): FileDTO
    {
        return new FileDTO($this->type, $this->filename, $this->language, $this->content);
    }
}