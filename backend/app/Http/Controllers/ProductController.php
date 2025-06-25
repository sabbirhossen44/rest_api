<?php

namespace App\Http\Controllers;

use App\Models\ProductGallery;
use App\Models\Tag;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;

class ProductController extends Controller
{
    public function Product_add(){
        $categories = Category::all();
        $subcategories = SubCategory::all();
        $brands = Brand::all();
        $tags = Tag::all();
        return view('admin.Product.product_add',[
            'categories' => $categories,
            'subcategories' => $subcategories,
            'brands' => $brands,
            'tags' => $tags,
        ]);
    }
    public function getsubCategory(Request $request){
        $str = '<option value="">Select Sub_Category</option>';
        $subcategories = SubCategory::where('category_id', $request->category_id)->get();
        foreach($subcategories as $subcategory){
            $str .= '<option value="'. $subcategory->id .'">'. $subcategory->name .'</option>';
        }
        echo $str;
    }

    public function product_store(Request $request){
        $request->validate([
            'category_id' => 'required',
            'subcategory_id' => 'required',
            'product_name' => 'required',
            'price' => 'required',
            'tags' => 'required',
            'short_des' => 'required',
            'preview' => 'required',
        ]);
        $photo = $request->file('preview');
        $photo_name = 'Produc_' . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('admin/product/preview/'), $photo_name);
        $remove = array("@", "#", "(",")","*", "/", " ", '""');
        $slug =  Str::lower(str_replace($remove, '-', $request->product_name)) . random_int(5000, 500000) . time();
        $product_id = Product::insertGetId([
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id,
            'brand_id' => $request->brand_id,
            'product_name' => $request->product_name,
            'price' => $request->price,
            'discount' => $request->discount,
            'after_discount' => $request->price - ($request->price * $request->discount / 100),
            'tags' => implode(',' ,$request->tags),
            'short_desp' => $request->short_des,
            'long_desp' => $request->long_des,
            'addi_info' => $request->addi_info,
            'preview' => $photo_name,
            'slug' => $slug,
            'created_at' => Carbon::now(),
        ]);

        $galleries = $request->file('gallery');
        foreach($galleries as $gallery){
            $file_name = 'Produc_Gallery_' . time() . uniqid() . '.' . $gallery->getClientOriginalExtension();
            $gallery->move(public_path('admin/product/gallery/'), $file_name);
            ProductGallery::insert([
                'product_id' => $product_id,
                'gallery' => $file_name,
                'created_at' => Carbon::now(),
            ]);
        }
        return back()->with('Product_add', 'New product Add successfully!');
    }

    public function product_list(){
        $products = Product::all();
        return view('admin.Product.product_list',[
            'products' => $products,
        ]);
    }
    public function product_getstatus(Request $request){
        Product::find($request->product_id)->update([
            'status' => $request->status,
            'updated_at' => Carbon::now(),
        ]);
    }
    public function product_discount30(Request $request){
        Product::find($request->product_id)->update([
            'discount30' => $request->status,
            'updated_at' => Carbon::now(),
        ]);
    }
    public function product_discount50(Request $request){
        Product::find($request->product_id)->update([
            'discount50' => $request->status,
            'updated_at' => Carbon::now(),
        ]);
    }
    public function product_discount70(Request $request){
        Product::find($request->product_id)->update([
            'discount70' => $request->status,
            'updated_at' => Carbon::now(),
        ]);
    }
}
