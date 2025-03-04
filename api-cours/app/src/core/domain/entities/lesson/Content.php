<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\ContentDTO;

class Content extends Entity
{
    private string $type;
    private ?string $content;

    private ?array $files;
    private int $index;

    private ?array $questions = null;

    public function __construct(string $type, ?string $content,int $index, ?array $files = null)
    {
        $this->type = $type;
        $this->content = $content;
        $this->files = $files;
        $this->index = $index;
    }

    public function setFiles(?array $files){
        $this->files = $files;
    }

    public function setQuestion(?array $question){
        $this->questions = $question;

    }

    public function toDTO(): ContentDTO
    {
        $c = new ContentDTO($this->type, $this->content, $this->index, $this->files);
        if($this->questions !=null){
            $c->setQuestions($this->questions);
        }
        return $c;
    }
}