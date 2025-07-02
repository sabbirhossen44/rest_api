<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $guarded = ['id'];

    public function inv_to_size(){
        return $this->belongsTo(Size::class, 'size_id');
    }
    public function inv_to_color(){
        return $this->belongsTo(Color::class, 'color_id');
    }
    public function inv_to_product() {
    return $this->belongsTo(Product::class, 'product_id');
}
}
