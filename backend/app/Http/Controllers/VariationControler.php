<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Size;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class VariationControler extends Controller
{
    public function variation()
    {
        $colors = Color::paginate(10);
        $sizes = Size::paginate(10);
        return view('admin.variation.variation', [
            'colors' => $colors,
            'sizes' => $sizes,
        ]);
    }
    public function color_store(Request $request)
    {
        $request->validate([
            'color_name' => 'required|unique:colors,color_name',
            'color_code' => 'required|unique:colors,color_code',
        ]);
        Color::insert([
            'color_name' => $request->color_name,
            'color_code' => $request->color_code,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('Color_add', "New Color Add Successfully!");
    }
    public function size_store(Request $request)
    {
        $request->validate([
            'size_name' => 'required|unique:sizes,size_name',
        ]);
        Size::insert([
            'size_name' => $request->size_name,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('size_add', "New Size Add Successfully!");
    }
    public function color_delete($id)
    {
        Color::find($id)->delete();
        return back()->with('color_delete', 'Color Deleted Successful!');
    }
    public function size_delete($id)
    {
        Size::find($id)->delete();
        return back()->with('size_delete', 'Size Deleted Successful!');
    }


    public function tags()
    {
        $tags = Tag::paginate(15);
        return view('admin.variation.tags', [
            'tags' => $tags,
        ]);
    }
    public function tag_store(Request $request)
    {
        $request->validate([
            'tag_name' => 'required|unique:tags,tag_name',
        ]);
        Tag::insert([
            'tag_name' => $request->tag_name,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('tag_add', "New Tag Add Successfully!");
    }
    public function tag_delete($id)
    {
        Tag::find($id)->delete();
        return back()->with('tag_delete', 'Tag Deleted Successful!');
    }
    public function brand(){
        $brands = Brand::latest()->paginate(15);
        return view('admin.variation.brand',[
            'brands' => $brands,
        ]);
    }
     public function brand_store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:brands,brand_name',
            'logo' => 'required|image',
        ]);
        $logo = $request->file('logo');
        $logo_name = "Logo_". time() . uniqid() . '.'. $logo->getClientOriginalExtension();
        $logo->move(public_path('admin/brand/'),$logo_name);
        Brand::insert([
            'brand_name' => $request->name,
            'brand_logo' => $logo_name,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('brand_add', "New Brand Add Successfully!");
    }
    public function brand_delete($id)
    {
        $brand =Brand::find($id);
        $photo = public_path('admin/brand/'.$brand->brand_logo);
        if ($brand->brand_logo && file_exists($photo)) {
            unlink($photo);
        }
        $brand->delete();
        return back()->with('brand_delete', 'Brand Deleted Successful!');
    }
}
