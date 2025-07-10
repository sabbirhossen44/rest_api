<?php

namespace App\Http\Controllers;

use Stripe\Stripe;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Billing;
use App\Models\Product;
use App\Mail\InvoiceMail;
use App\Models\Inventory;
use Stripe\PaymentIntent;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class StripePaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $amount = ((int) $request->total) * 100;

        $intent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'bdt',
            'payment_method_types' => ['card'],
        ]);

        if ($request->payment == 2) {
            $order_id = '#' . uniqid() . time();
            Order::insert([
                'order_id' => $order_id,
                'customer_id' => $request->id,
                'total' => $request->total,
                'sub_total' => $request->subtotal,
                'discount' => $request->coupon,
                'charge' => $request->charge,
                'payment_method' => $request->payment,
                'order_date' => Carbon::now()->format('Y-m-d'),
                'created_at' => Carbon::now(),
            ]);
            Billing::insert([
                'order_id' => $order_id,
                'customer_id' => $request->id,
                'name' => $request->name,
                'city' => $request->city,
                'zip' => $request->zip,
                'company' => $request->companyName,
                'email' => $request->email,
                'phone' => $request->number,
                'address' => $request->address,
                'created_at' => Carbon::now(),
            ]);
            $carts = Cart::where('customer_id', $request->id)->get();
            foreach ($carts as $cart) {
                OrderProduct::insert([
                    'order_id' => $order_id,
                    'customer_id' => $request->id,
                    'product_id' => $cart->product_id,
                    'price' => $cart->cart_to_product->after_discount,
                    'color_id' => $cart->color_id,
                    'size_id' => $cart->size_id,
                    'quantity' => $cart->quantity,
                    'created_at' => Carbon::now(),
                ]);
                Inventory::where('product_id', $cart->product_id)->where('color_id', $cart->color_id)->where('size_id', $cart->size_id)->decrement('quantity', $cart->quantity);
                Product::where('id', $cart->product_id)->increment('sold_count', $cart->quantity);
                Cart::find($cart->id)->delete();
            }
            Mail::to($request->email)->send(new InvoiceMail($order_id));
        }

        return response()->json([
            'clientSecret' => $intent->client_secret,
        ]);
    }
}
