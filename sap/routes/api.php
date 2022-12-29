<?php

use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/users', [DataController::class, 'users']);
Route::post('/create-user', [DataController::class, 'create_user']);
Route::get('/user/{id}', [DataController::class, 'get_user']);
Route::post('/update-user', [DataController::class, 'update_user']);
Route::delete('/delete-user/{id}', [DataController::class, 'delete_user']);
