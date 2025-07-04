<?php

use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\FrontendController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// banner part
Route::get('/banner', [FrontendController::class, 'banner']);

// category
Route::get('/categorys', [FrontendController::class, 'category']);

// colors
Route::get('/colors', [FrontendController::class, 'colors']);

// brand
Route::get('/brands', [FrontendController::class, 'brands']);
// product details
Route::get('/product_details/{slug}', [FrontendController::class, 'product_details']);
Route::post('/getSize', [FrontendController::class, 'getSize']);
Route::post('/getQuantity', [FrontendController::class, 'getQuantity']);

// product
Route::get('/products', [FrontendController::class, 'products']);


// customer

Route::prefix('customer')->group(function () {
    Route::post('/register', [CustomerAuthController::class, 'register']);
    Route::post('/login', [CustomerAuthController::class, 'login']);
    Route::post('/update', [CustomerAuthController::class, 'update']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [CustomerAuthController::class, 'logout']);
    });
});

// cart
Route::post('/cart/store', [CartController::class, 'cartStore']);
Route::get('/cart/product/{id}', [CartController::class, 'cartProduct']);
Route::get('/cart/delete/{id}', [CartController::class, 'cartDelete']);
Route::put('/cart/update/{id}', [CartController::class, 'updateQuantity']);

// coupon
Route::post('/coupon', [CartController::class, 'coupon']);