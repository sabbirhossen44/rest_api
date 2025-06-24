<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function banner()
    {
        $banners = Banner::where('status', 1)->orderBy('id', 'desc')->get()->map(function($item){
            $item-> photo_path= asset('admin/banner/' .$item->photo);
            return $item;
        });
        try {
            return response()->json([
                'status' => true,
                'message' => 'All Banner',
                'banners' => $banners,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'error' => $th->getMessage(),
            ]);
        }
    }
}
