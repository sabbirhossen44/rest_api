<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = Banner::latest('id')->get();
        return view('admin.Banner.index', [
            'banners' => $banners,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'banner_photo' => 'required|image'
        ]);
        $photo = $request->file('banner_photo');
        $photo_name = "banner_" . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('admin/banner/'), $photo_name);
        Banner::insert([
            'photo' => $photo_name,
            'status' => 0,
            'created_at' => Carbon::now(),
        ]);
        return back()->with('banner_add', 'Banner Add Successful!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner)
    {
        return view('admin.banner.edit',[
            'banner' => $banner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'photo' => 'required|image'
        ]);
        
        $photo_path = public_path('admin/banner/'. $banner->photo);
        if ($banner->photo && file_exists($photo_path)) {
            unlink($photo_path);
        }
        $photo = $request->file('photo');
        $photo_name = "banner_" . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('admin/banner/'), $photo_name);
        $banner->update([
            'photo' => $photo_name,
            'updated_at' => Carbon::now(),
        ]);
        return back()->with('banner_update', 'Banner Update Successful!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner) {}
    public function banner_status(Request $request)
    {
        Banner::find($request->banner_id)->update([
            'status' => $request->status,
            'updated_at' => Carbon::now(),
        ]);
    }
    public function banner_delete($id)
    {
        $banner = Banner::find($id);
        $photo_puth = public_path('admin/banner/' . $banner->photo);
        if (file_exists($photo_puth)) {
            unlink($photo_puth);
        }
        $banner->delete();
        return back()->with('banner_delete', 'Banner Delete Successful!');
    }
}
