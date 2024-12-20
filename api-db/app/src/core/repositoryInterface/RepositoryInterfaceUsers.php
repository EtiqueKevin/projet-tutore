<?php

namespace apiDB\core\repositoryInterface;

use apiDB\core\domain\entities\user\User;

interface RepositoryInterfaceUsers{

    function getUserById(string $id) : User;

}