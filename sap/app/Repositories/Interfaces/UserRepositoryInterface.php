<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface {

	// Users
	public function getAllUsers();
	public function getUser(int $id);
	public function createUser(array $request);
	public function updateUser(array $request);
	public function deleteUser(int $id);
}