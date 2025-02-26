<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\DTO;

class ContentDTO extends DTO
{
    private string $type;
    private string $content;
    private ?array $files;

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

    public function jsonSerialize(): array
    {

        if($this->files != null){

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
        }else{
            return [
                'type' => $this->type,
                'content' => $this->content,
                'index' => $this->index,
            ];
        }

    }
}