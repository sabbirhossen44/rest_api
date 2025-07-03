<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CartController extends Controller
{
    public function cartStore(Request $request)
    {
        $request->validate([
            'customer_id' => 'required',
            'product_id' => 'required',
            'color_id' => 'required',
            'size_id' => 'required',
            'quantity' => 'required',
        ]);
        try {
            Cart::insert([
                'customer_id' => $request->customer_id,
                'product_id' => $request->product_id,
                'color_id' => $request->color_id,
                'size_id' => $request->size_id,
                'quantity' => $request->quantity,
                'created_at' => Carbon::now(),
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Cart Added Successful!'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function cartProduct($id)
    {
        $customer = Cart::where('customer_id', $id)->with('cart_to_product')->get()
            ->map(function ($e) {
                $e->photo = asset('admin/product/preview/' . $e->cart_to_product->preview);
                return $e;
            });
        return response()->json([
            'customer' => $customer,
        ]);
    }
    public function cartDelete($id){
        
        try {
            Cart::find($id)->delete();
            return response()->json([
                'status' =>     true,
                'message' => 'Cart Product Delete Successful!'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        }
    }
}
