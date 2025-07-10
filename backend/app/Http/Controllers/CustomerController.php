<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function customer_list(){
        $customers = Customer::latest()->get();
        return view('admin.Customer.index',[
            'customers' => $customers,
        ]);
    }
}
