<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function banner()
    {
        $banners = Banner::where('status', 1)->orderBy('id', 'desc')->get()->map(function ($item) {
            $item->photo_path = asset('admin/banner/' . $item->photo);
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

    public function category()
    {
        $categories = Category::all();
        try {
            return response()->json([
                'status' => true,
                'message' => 'Category Get Successful!',
                'categories' => $categories,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Category Get some issue!',
                'error' => $th->getMessage(),
            ]);
        }
    }
    public function colors()
    {
        $colors = Color::all();
        try {
            return response()->json([
                'status' => true,
                'message' => 'colors Get Successful!',
                'colors' => $colors,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'colors Get some issue!',
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function products(Request $request)
    {
        try {
            $data = $request->all();
            $products = Product::where('status', 1)
                // category filtaring
                ->when(!empty($data['category']) && $data['category'] !== 'undefined', function ($q) use ($data) {
                    $q->where('category_id', $data['category']);
                })
                ->when(!empty($data['color']) && $data['color'] !== 'undefined', function ($q) use ($data) {
                    $q->whereHas('pro_to_inv', function ($q) use ($data) {
                        $q->whereHas('inv_to_color', function ($q) use ($data) {
                            $q->where('color_id', $data['color']);
                        });
                    });
                })
                // ->when(!empty($data['color'] ?? null) && $data['color'] !== 'undefined', function ($q) use ($data) {
                //     $q->whereHas('pro_to_inv', function ($q) use ($data) {
                //         $q->whereHas('inv_to_color', function ($q) use ($data) {
                //             $q->where('color_id', $data['color']);
                //         });
                //     });
                // })
                ->when(!empty($data['search']) && $data['search'] !== 'undefined', function ($q) use ($data) {
                    $q->where('product_name', 'like', '%' . $data['search'] . '%');
                    $q->where('short_desp', 'like', '%' . $data['search'] . '%');
                })

                ->get()
                ->map(function ($e) {
                    $e->photo = asset('admin/product/preview/' . $e->preview);
                    return $e;
                });


            return response()->json([
                'status' => true,
                'message' => "Products fetched",
                'products' => $products,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Product not found",
                'error' => $th->getMessage(),
            ]);
        }
    }
}
