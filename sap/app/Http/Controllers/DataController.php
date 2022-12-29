<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function users()
    {
        return $this->userRepository->getAllUsers();
    }
    
    public function create_user(Request $request)
    {
        return $this->userRepository->createUser($request);
    }
    
    public function get_user($id)
    {
        return $this->userRepository->getUser($id);
    }

    public function update_user(Request $request)
    {
        return $this->userRepository->updateUser($request);
    }

    public function delete_user($id)
    {
        return $this->userRepository->deleteUser($id);
    }
}
