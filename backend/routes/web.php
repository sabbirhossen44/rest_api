<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubCategoryController;
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
Route::post('/user/password/{id}', [UserController::class, 'user_password'])->name("user.password");
Route::get('/user/list', [UserController::class, 'user_list'])->name("user.list");
Route::post('/user/store', [UserController::class, 'user_store'])->name("user.store");
Route::get('/user/delete/{id}', [UserController::class, 'user_delete'])->name("user.delete");


// banner part
Route::resource('/banner', BannerController::class);
Route::post('/banner/status', [BannerController::class, 'banner_status']);
Route::get('/banner/delete/{id}', [BannerController::class, 'banner_delete'])->name('banner.delete');

// category
Route::resource('/category', CategoryController::class);
Route::get('/category/delete/{id}', [CategoryController::class, 'category_delete'])->name('category.delete');
Route::get('/category/trash/list', [CategoryController::class, 'category_trash'])->name('category.trash');
Route::get('/category/parmarent/delete/{id}', [CategoryController::class, 'category_parmarent_delete'])->name('category.parmarent_delete');
Route::get('/category/restore/{id}', [CategoryController::class, 'category_restore'])->name('category.restore');

// sub category
Route::resource('/subCategory', SubCategoryController::class);
Route::get('/subCategory/delete/{id}', [SubCategoryController::class , 'subCategory_delete'])->name('subCategory.delete');

require __DIR__.'/auth.php';
