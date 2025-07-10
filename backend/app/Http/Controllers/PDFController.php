<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\PDF;

class PDFController extends Controller
{
    public function generatePDF($id)
    {
        $id = urldecode($id); 
        $order_id = Order::where('order_id', $id)->first();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('admin.Mail.invoiceMail', ['order_id' => $order_id->order_id]);

        return $pdf->stream('invoice-' . $order_id->order_id . '.pdf');
        // return $pdf->download('invoice-' . $order_id->order_id . '.pdf');
    }
}
