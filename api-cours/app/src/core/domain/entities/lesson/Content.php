<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\ContentDTO;

class Content extends Entity
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

    public function toDTO(): ContentDTO
    {
        return new ContentDTO($this->id, $this->type, $this->text, $this->link);
    }
}