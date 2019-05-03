<?php

use Illuminate\Http\Request;

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

Route::get('especialidade', 'Api\EspecialidadeController@search');

Route::get('medico', 'Api\MedicoController@search');
Route::post('medico', 'Api\MedicoController@post');
Route::put('medico/{id}', 'Api\MedicoController@put');
Route::delete('medico/{id}', 'Api\MedicoController@delete');
