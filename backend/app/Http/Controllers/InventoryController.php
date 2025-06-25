<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class InventoryController extends Controller
{
    public function inventory($id)
    {
        $product = Product::find($id);
        $sizes = Size::all();
        $colors = Color::all();
        $inventries = Inventory::where('product_id', $product->id)->get();
        return view('admin.Inventory.index', [
            'product' => $product,
            'sizes' => $sizes,
            'colors' => $colors,
            'inventries' => $inventries,
        ]);
    }
    public function inventory_store(Request $request, $id)
    {
        $product = Product::find($id);
        $request->validate([
            'size_id' => 'required',
            'color_id' => 'required',
            'quantity' => 'required',
        ]);
        if (Inventory::where('product_id', $product->id)->where('color_id', $request->color_id)->where('size_id', $request->size_id)->exists()) {
            Inventory::where('product_id', $product->id)->where('color_id', $request->color_id)->where('size_id', $request->size_id)->increment('quantity', $request->quantity);
            return back()->with('inventory_store', "Inventory Added Successful!");
        } else {
            Inventory::insert([
                'product_id' => $product->id,
                'size_id' => $request->size_id,
                'color_id' => $request->color_id,
                'quantity' => $request->quantity,
                'created_at' => Carbon::now(),
            ]);
            return back()->with('inventory_store', "Inventory Added Successful!");
        }
    }
    public function inventory_delete($id){
        Inventory::find($id)->delete();
        return back()->with('inventory_delete', "Inventory Deleted Successful!");
    }
}
