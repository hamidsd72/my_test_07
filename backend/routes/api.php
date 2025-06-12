<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::prefix('v1')->group(function () {

    Route::prefix('tasks')->name('tasks.')->controller(TaskController::class)->group(function () {
        Route::get('',              'index');
        Route::post('',             'store');
        Route::put('{task}',        'update');
        Route::delete('{task}',     'destroy');
    });

});