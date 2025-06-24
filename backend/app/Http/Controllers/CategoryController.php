<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::latest()->paginate(10);
        return view('admin.Category.index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'photo' => 'required|image',
        ]);
        $photo = $request->file('photo');
        $photo_name = "Category_" . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('admin/category/'), $photo_name);
        Category::insert([
            'name' => $request->name,
            'photo' => $photo_name,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('add_category', "Category Added Successful!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return view('admin.category.edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'photo' => 'required|image'
        ]);
        if ($request->hasFile('photo')) {
            $photot_path = public_path('admin/category/' . $category->photo);
            if (file_exists($photot_path)) {
                unlink($photot_path);
            }
            $photo = $request->file('photo');
            $photo_name = "Category_" . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('admin/category/'), $photo_name);
            $category->update([
                'photo' => $photo_name,
                'updated_at' => Carbon::now(),
            ]);
            return back()->with('category_update', 'Category Updated successful!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
    public function category_delete($id)
    {
        $category = Category::find($id);
        $category->delete();
        return back()->with('category_trasted', "Category Trashted Successfully!");
    }
    public function category_trash()
    {
        $categories = Category::onlyTrashed()->paginate(10);
        return view('admin.category.trash_list', [
            'categories' => $categories,
        ]);
    }
    public function category_parmarent_delete($id)
    {
        $category = Category::onlyTrashed()->find($id);
        $category->forceDelete();
        return back()->with('category_trasted_delete', "Category Parmarent Delete Successfully!");
    }
    public function category_restore($id)
    {
        $category = Category::onlyTrashed()->find($id);
        $category->restore();
        return back()->with('category_trasted_restore', "Category Restore Successfully!");
    }
}
