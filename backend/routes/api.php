<?php

use App\Http\Controllers\FrontendController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// banner part
Route::get('/banner', [FrontendController::class, 'banner']);

// category
Route::get('/categorys', [FrontendController::class, 'category']);

// colors
Route::get('/colors', [FrontendController::class, 'colors']);

// product
Route::get('/products', [FrontendController::class, 'products']);
