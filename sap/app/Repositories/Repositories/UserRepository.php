<?php

namespace App\Repositories\Repositories;

use Illuminate\Http\Request;


use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Requests\UserCreateRequest;
use App\Requests\UserUpdateRequest;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserRepository implements UserRepositoryInterface {

	public function __construct(UserCreateRequest $userCreateRequest, UserUpdateRequest $userUpdateRequest)
    {
        $this->userCreateRequest = $userCreateRequest;
        $this->userUpdateRequest = $userUpdateRequest;
    }

	private $model;

	public function getAllUsers()
	{
		return User::all();
	}

	public function getUser(int $id)
	{
		return response()->json([
            'user' => User::find($id)
        ]);
	}

	public function createUser($request)
	{
		$this->userCreateRequest->validate($request->toArray());

		try {
			
            $imageName = Str::random().'.'.$request->avatar->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('user/image', $request->avatar,$imageName);
            User::create($request->post()+['avatar'=>$imageName]);

            return response()->json([
                'message'=>'User Created Successfully!!'
            ]);

        } catch(\Exception $e) {
            
			\Log::error($e->getMessage());
            
			return response()->json([
                'message'=>'Something goes wrong while creating a user!!'
            ], 500);
        }

	}

	public function updateUser($request)
	{

		$this->userUpdateRequest->validate($request->toArray());

		try {

			$user = User::find($request->id);
            $user->fill($request->post())->update();

            if($request->hasFile('avatar')){

                if($user->avatar){
                    $exists = Storage::disk('public')->exists("user/image/{$user->avatar}");
                    if($exists){
                        Storage::disk('public')->delete("user/image/{$user->avatar}");
                    }
                }

                $imageName = Str::random().'.'.$request->avatar->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('user/image', $request->avatar, $imageName);
                $user->avatar = $imageName;
                $user->save();
            }

            return response()->json([
                'message'=>'Product Updated Successfully!!'
            ]);

        } catch(\Exception $e) {
            
			\Log::error($e->getMessage());
            
			return response()->json([
                'message'=>'Something goes wrong while updating a product!!'
            ], 500);
        }
	}

	public function deleteUser($id)
	{
		return User::where('id', $id)->delete();
	}

}
