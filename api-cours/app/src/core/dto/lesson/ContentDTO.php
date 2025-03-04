<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\DTO;

class ContentDTO extends DTO
{
    private string $type;
    private string $content;
    private ?array $files;

    private ?array $questions = null;

    private int $index;

    public function __construct(string $type, string $content,int $index, ?array $files = null)
    {
        $this->type = $type;
        $this->content = $content;
        $this->index = $index;
        if($files != null){
            if($files['0'] instanceof Entity){
                foreach ($files as $f){
                    $this->files[] = $f->toDTO();
                }

            }else{
                $this->files = $files;
            }
        }else{
            $this->files = null;
        }
    }

    public function setQuestions(?array $questions): void{
        if($questions['0'] instanceof Entity){
            foreach($questions as $q){
                $this->questions[] = $q->toDTO();
            }
        }else{
            $this->questions = $questions;
        }
    }

    public function jsonSerialize(): array
    {

        if($this->files != null && $this->questions != null){

            $ff = [];
            foreach ($this->files as $f){
                $ff[] = $f->jsonSerialize();
            }

            $aaa = [];
            foreach ($this->questions as $q){
                $aaa[] = $q;
            }

            return [
                'type' => $this->type,
                'content' => $this->content,
                'index' => $this->index,
                'files' => $ff,
                'questions' => $this->questions
            ];
        }else if($this->files != null  && $this->questions === null){

            $ff = [];
            foreach ($this->files as $f){
                $ff[] = $f->jsonSerialize();
            }

            return [
                'type' => $this->type,
                'content' => $this->content,
                'index' => $this->index,
                'files' => $ff,
            ];
        }else if($this->files === null && $this->questions != null){

            $aaa = [];
            foreach ( $this->questions as $q){
                $aaa[] = $q->jsonSerialize();
            }
            return [
                'type' => $this->type,
                'content' => $this->content,
                'index' => $this->index,
                'questions' => $aaa
            ];

        }
        else{
            return [
                'type' => $this->type,
                'content' => $this->content,
                'index' => $this->index,
            ];
        }

    }
}