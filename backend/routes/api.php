<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\StripePaymentController;
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
Route::get('/orderproduct/details/{id}', [FrontendController::class, 'orderproduct_info']);
Route::post('/product/review', [FrontendController::class, 'product_review_store']);
Route::get('/newProduct', [FrontendController::class, 'newProduct']);
Route::get('/bestSale', [FrontendController::class, 'bestSale']);
Route::get('/speciaOffers', [FrontendController::class, 'speciaOffers']);

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


// checkout
Route::post('/checkout', [CheckoutController::class, 'checkout']);
Route::get('/checkout/data/{id}', [CheckoutController::class, 'checkoutdata']);
Route::get('/generatepdf/{id}', [PDFController::class, 'generatePDF']);


// stripe payment
Route::post('/create-payment-intent', [StripePaymentController::class, 'createPaymentIntent']);


// contact page
Route::post('/contactmessage', [FrontendController::class, 'contactmessage']);

// Subscribe
Route::post('/subscribe', [FrontendController::class, 'subscribe']);
