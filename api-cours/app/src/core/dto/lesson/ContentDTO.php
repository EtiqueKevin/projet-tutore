<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class ContentDTO extends DTO
{
    private string $type;
    private string $content;
    private ?array $files;

    private int $index;

    public function __construct(string $type, string $content,int $index, ?array $files )
    {
        $this->type = $type;
        $this->content = $content;
        $this->index = $index;
        if($files != null){
            foreach ($files as $f){
                $this->files[] = $f->toDTO();
            }
        }else{
            $this->files = null;
        }
    }

    public function jsonSerialize(): array
    {
        return [
            'type' => $this->type,
            'content' => $this->content,
            'index' => $this->index,
            'files' => $this->files,
        ];
    }
}