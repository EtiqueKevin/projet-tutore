<?php

namespace apiDB\core\dto\user;

use apiDB\core\domain\entities\user\User;
use apiDB\core\dto\DTO;
use DateTime;
use Ramsey\Uuid\Uuid;

class UserDTO extends DTO{
    private string $id;
    private string $name;
    private string $surname;
    protected int $role;
    protected ?string $linkpic;
    private string $email;

    protected DateTime $datesignup;
    protected DateTime $datesignin;

    public function __construct(User $u){
        $this->id = $u->getID();
        $this->name = $u->name;
        $this->surname = $u->surname;
        $this->email = $u->email;
        $this->datesignin = $u->datesignin;
        $this->datesignup = $u->datesignup;
        $this->role = $u->role;
        $this->linkpic = $u->linkpic;

    }

    public function jsonSerialize(): array
    {
       return [
           'id' => $this->id,
           'name' => $this->name,
          'surname' => $this->surname,
           'role' => $this->role,
           'linkpic' => $this->linkpic,
           'email' => $this->email,
           'datesignin' => $this->datesignin->format('Y-m-d'),
           'datesignup' => $this->datesignup->format('Y-m-d')
       ];
    }
}