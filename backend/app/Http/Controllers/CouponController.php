<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::paginate(10);
        return view('admin.Coupon.index', [
            'coupons' => $coupons,
        ]);
    }
    public function coupon_store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'limit' => 'required',
            'discount' => 'required',
            'date' => 'required'
        ]);
        Coupon::insert([
            'name' => $request->name,
            'limit' => $request->limit,
            'discount' => $request->discount,
            'date' => $request->date,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('coupon_add', 'Coupon Store Successfull!');
    }

    public function coupon_status(Request $request)
    {
        Coupon::find($request->coupon_id)->update([
            'status' => $request->status,
            'updated_at' => Carbon::now(),
        ]);
    }
    public function coupon_edit($id)
    {
        $coupon = Coupon::find($id);
        return view('admin.Coupon.edit', [
            'coupon' => $coupon,
        ]);
    }
    public function coupon_update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'limit' => 'required',
            'discount' => 'required',
            'date' => 'required'
        ]);
        Coupon::find($id)->update([
            'name' => $request->name,
            'limit' => $request->limit,
            'discount' => $request->discount,
            'date' => $request->date,
            'updated_at' => Carbon::now(),
        ]);
        return back()->with('coupon_update', 'Coupon Update Successfull!');
    }
    public function coupon_delete($id){
        Coupon::find($id)->delete();
        return back()->with('coupon_delete', 'Coupon Delete Successfull!');
    }
}
