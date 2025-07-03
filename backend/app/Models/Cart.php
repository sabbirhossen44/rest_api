<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public function cart_to_product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
}
