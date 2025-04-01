<?php

namespace apiUtilisateur\core\dto\user;

use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\dto\DTO;
use DateTime;
use Ramsey\Uuid\Uuid;

class UserDTO extends DTO{
    private string $id;
    private string $name;
    private string $surname;
    protected ?string $linkpic;
    protected ?string $pseudo;
    protected int $role;

    public function __construct(User $u){
        $this->id = $u->getID();
        $this->name = $u->name;
        $this->surname = $u->surname;
        $this->linkpic = $u->linkpic;
        $this->pseudo = $u->pseudo;
        $this->role = $u->role;
    }

    public function jsonSerialize(): array
    {
       return [
           'id' => $this->id,
           'name' => $this->name,
          'surname' => $this->surname,
           'linkpic' => $this->linkpic,
           'pseudo' => $this->pseudo,
              'role' => $this->role

       ];
    }

    public function getLinkPic(): ?string
    {
        return $this->linkpic;
    }
    public function getNom(): string
    {
        return $this->name;
    }
    public function getPrenom(): string
    {
        return $this->surname;
    }
}