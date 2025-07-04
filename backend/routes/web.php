<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VariationControler;
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


// inventory
Route::get('/variation', [VariationControler::class, 'variation'])->name('variation');
Route::post('/color/store', [VariationControler::class, 'color_store'])->name('color.store');
Route::get('/color/delete/{id}', [VariationControler::class, 'color_delete'])->name('color.delete');
Route::post('/size/store', [VariationControler::class, 'size_store'])->name('size.store');
Route::get('/size/delete/{id}', [VariationControler::class, 'size_delete'])->name('size.delete');
Route::get('/tags',[VariationControler::class, 'tags'])->name('tags');
Route::post('/tag/store', [VariationControler::class, 'tag_store'])->name('tag.store');
Route::get('/tag/delete/{id}', [VariationControler::class, 'tag_delete'])->name('tag.delete');
Route::get('/brand',[VariationControler::class, 'brand'])->name('brand');
Route::post('/brand/store', [VariationControler::class, 'brand_store'])->name('brand.store');
Route::get('/brand/delete/{id}', [VariationControler::class, 'brand_delete'])->name('brand.delete');

// product
Route::get('/Product/add', [ProductController::class, 'Product_add'])->name('Product.add');
Route::post('/getsubCategory', [ProductController::class, 'getsubCategory']);
Route::post('/product/store', [ProductController::class, 'product_store'])->name('product.store');
Route::get('/product/list', [ProductController::class, 'product_list'])->name('product.list');
Route::post('/product/getstatus', [ProductController::class, 'product_getstatus']);
Route::post('/product/discount30', [ProductController::class, 'product_discount30']);
Route::post('/product/discount50', [ProductController::class, 'product_discount50']);
Route::post('/product/discount70', [ProductController::class, 'product_discount70']);

// inventory
Route::get('/inventory/{id}', [InventoryController::class, 'inventory'])->name('inventory');
Route::post('/inventory/store/{id}', [InventoryController::class, 'inventory_store'])->name('inventory.store');
Route::get('/inventory/delete/{id}', [InventoryController::class, 'inventory_delete'])->name('inventory.delete');

// coupon
Route::get('/coupon', [CouponController::class, 'index'])->name('coupon');
Route::post('/coupon/store', [CouponController::class, 'coupon_store'])->name('coupon.store');
Route::post('/coupon/getstatus', [CouponController::class, 'coupon_status']);
Route::get('coupon/edit/{id}', [CouponController::class, 'coupon_edit'])->name('coupon.edit');
Route::post('coupon/update/{id}', [CouponController::class, 'coupon_update'])->name('coupon.update');
Route::get('coupon/delete/{id}', [CouponController::class, 'coupon_delete'])->name('coupon.delete');

require __DIR__.'/auth.php';
