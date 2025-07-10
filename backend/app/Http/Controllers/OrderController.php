<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class OrderController extends Controller
{
    public function order_list()
    {
        $orders = Order::latest()->get();
        return view('admin.Order.index', [
            'orders' => $orders,
        ]);
    }
    public function order_status(Request $request, $id)
    {
        if ($request->status == 5) {
            Order::find($id)->update([
                'status' => $request->status,
                'updated_at' => Carbon::now(),
            ]);
            $order_id = Order::find($id)->order_id;
            foreach (OrderProduct::where('order_id', $order_id)->get() as $orderproduct) {
                Inventory::where('product_id', $orderproduct->product_id)->where('color_id' , $orderproduct->color_id)->where('size_id', $orderproduct->size_id)->increment('quantity', $orderproduct->quantity);
                Product::where('id', $orderproduct->product_id)->decrement('sold_count', $orderproduct->quantity);
            }
        } else {
            Order::find($id)->update([
                'status' => $request->status,
                'updated_at' => Carbon::now(),
            ]);
        }
        return back()->with('success', 'Order status updated successfully!');
    }
}
