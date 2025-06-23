<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// user controller
Route::get('/user/info', [UserController::class, 'user_info'])->name("user.info");
Route::post('/user/info/update/{id}', [UserController::class, 'user_info_update'])->name("user.info.update");
Route::post('/user/photo/update/{id}', [UserController::class, 'user_photo_update'])->name("user.photo.update");


// banner part
Route::resource('/banner', BannerController::class);

require __DIR__.'/auth.php';
