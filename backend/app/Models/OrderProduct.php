<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    public $guarded = ['id'];
    public function rel_to_product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
   public function rel_to_order() {
    return $this->belongsTo(Order::class, 'order_id', 'order_id');
}
}
