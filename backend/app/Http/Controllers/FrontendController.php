<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Customer;
use App\Models\Inventory;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\ProductGallery;
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
    public function brands()
    {
        $brands = Brand::all();
        try {
            return response()->json([
                'status' => true,
                'message' => 'brands Get Successful!',
                'brands' => $brands,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'brands Get some issue!',
                'error' => $th->getMessage(),
            ]);
        }
    }


    public function products(Request $request)
    {
        try {
            $data = $request->all();
            $based = 'created_at';
            $type = 'DESC';
            if (!empty($data['sort']) && $data['sort'] !== 'undefined') {
                if ($data['sort'] == 1) {
                    $based = 'after_discount';
                    $type = 'ASC';
                } elseif ($data['sort'] == 2) {
                    $based = 'after_discount';
                    $type = 'DESC';
                } elseif ($data['sort'] == 3) {
                    $based = 'product_name';
                    $type = 'ASC';
                } elseif ($data['sort'] == 4) {
                    $based = 'product_name';
                    $type = 'DESC';
                }
            }
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
                ->when(!empty($data['brand']) && $data['brand'] !== 'undefined', function ($q) use ($data) {
                    $q->whereHas('pro_to_brand', function ($q) use ($data) {
                        $q->where('brand_id', $data['brand']);
                    });
                })
                ->when(!empty($data['search']) && $data['search'] !== 'undefined', function ($q) use ($data) {
                    $q->where('product_name', 'like', '%' . $data['search'] . '%')
                        ->orWhere('short_desp', 'like', '%' . $data['search'] . '%');
                })
                ->orderBy($based, $type)
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

    public function getSize(Request $request)
    {
        $size = Inventory::where('product_id', $request->product_id)->where('color_id', $request->color_id)->with('inv_to_size')->get();
        return response()->json([
            'status' => true,
            'size' => $size,
        ]);
    }

    public function getQuantity(Request $request)
    {
        $inventory = Inventory::where('product_id', $request->product_id)
            ->where('color_id', $request->color_id)
            ->where('size_id', $request->size_id)
            ->first();

        if ($inventory) {
            if ($inventory->quantity == 0) {
                return response()->json([
                    'quantity' => 0,
                    'className' => "text-red-500",
                    'message' => "Out of Stock",
                ]);
            } else {
                return response()->json([
                    'quantity' => $inventory->quantity,
                    'className' => "text-green-500",
                    'message' => "Available: " . $inventory->quantity . " Product",
                ]);
            }
        } else {
            return response()->json([
                'quantity' => 0,
                'className' => "text-red-500",
                'message' => "Not Available",
            ]);
        }
    }

    public function product_details($slug)
    {
        $product = Product::where('slug', $slug)->with([
            'pro_to_cate',
            'pro_to_inv.inv_to_color',
            'pro_to_inv.inv_to_size',
        ])->first();
        $product->photo = asset('admin/product/preview/' . $product->preview);
        $product_gallery = ProductGallery::where('product_id', $product->id)->get()->map(function ($g) {
            $g->gallery = asset('admin/product/gallery/' . $g->gallery);
            return $g;
        });
        try {
            return response()->json([
                'status' => true,
                'message' => "Product get successful!",
                'product' => $product,
                'product_gallery' => $product_gallery,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => "Product not found",
                'products' => $th->getMessage(),
            ]);
        }
    }
    public function orderproduct_info($id)
    {
        $products = OrderProduct::where('product_id', $id)
            ->whereNotNull('review')
            ->where('review', '!=', '')
            ->orderByDesc('star')
            ->take(12)
            ->get();

        $total_review = $products->count();

        $total_star = OrderProduct::where('product_id', $id)
            ->whereNotNull('review')
            ->where('review', '!=', '')
            ->sum('star');

        $users = [];

        foreach ($products as $product) {
            $customer = Customer::find($product->customer_id);

            if ($customer) {
                $users[] = [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'photo_url' => $customer->photo ? asset('admin/customer/' . $customer->photo) : '',
                ];
            }
        }

        return response()->json([
            'status' => true,
            'products' => $products,
            'total_review' => $total_review,
            'total_star' => (int)$total_star,
            'users' => $users
            // $formattedDate = Carbon::parse($orderDate)->format('F d, Y \a\t g:i a');
        ]);
    }

    public function product_review_store(Request $request)
    {
        $request->validate([
            'comment' => 'required',
            'product_id' => 'required',
            'star' => 'required|integer|min:1|max:5',
            'userid' => 'required',
        ]);

        try {
            $product = OrderProduct::where('customer_id', $request->userid)
                ->where('product_id', $request->product_id)
                ->first();

            if (!$product) {
                return response()->json([
                    'status' => false,
                    'message' => 'You must purchase this product before reviewing.',
                ]);
            }

            if (!empty($product->review)) {
                return response()->json([
                    'status' => false,
                    'message' => 'You have already reviewed this product.',
                ]);
            }

            // Save review and star
            $product->review = $request->comment;
            $product->star = $request->star;
            $product->save();
            return response()->json([
                'status' => true,
                'message' => 'Your review has been submitted successfully!',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong.',
                'error' => $th->getMessage()
            ]);
        }
    }
    public function newProduct()
    {
        try {
            $products = Product::where('status', 1)->latest()
                ->take('10')
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
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function bestSale()
    {
        try {
            $products = Product::where('status', 1)
                ->orderByDesc('sold_count')
                ->take('10')
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
                'message' => $th->getMessage(),
            ]);
        }
    }
    public function speciaOffers()
    {
        try {
            $products = Product::where('status', 1)
                ->orderByDesc('discount')
                ->take('10')
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
                'message' => $th->getMessage(),
            ]);
        }
    }
}
