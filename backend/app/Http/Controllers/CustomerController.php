<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Customer;
use App\Models\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CustomerController extends Controller
{
    public function customer_list()
    {
        $customers = Customer::latest()->get();
        return view('admin.Customer.index', [
            'customers' => $customers,
        ]);
    }
    public function customer_message()
    {
        $messages = ContactMessage::where('created_at', '>=', Carbon::now()->subDays(15))->latest()->get();
        return view('admin.customer.message', [
            'messages' => $messages,
        ]);
    }
    public function customer_message_delete($id)
    {
        ContactMessage::find($id)->delete();
        return back()->with('delete', 'Customer Message Delete Successful!');
    }
    public function subscribe_list()
    {
        $subscribe = Subscribe::latest()->get();
        return view('admin.customer.subscribe', [
            'subscribe' => $subscribe
        ]);
    }
    public function subscribe_delete($id)
    {
        Subscribe::find($id)->delete();
        return back()->with('Subscribe_delete', 'Subscribe Delete Successful!');
    }
}
