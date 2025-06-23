<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function user_info()
    {
        $user = User::where('id', Auth::id())->first();
        // return $user;
        return view('admin.user.user_info', [
            'user' => $user,
        ]);
    }
    public function user_info_update(Request $request, $id)
    {
        $user = User::find($id);
        $request->validate([
            'name' => 'required'
        ]);
        $user->update([
            'name' => $request->name,
            'updated_at' => Carbon::now(),
        ]);
        return back()->with('user_info', 'User Info Update Successfully!');
    }
    public function user_photo_update(Request $request, $id){
        $user =User::find($id);
        $request->validate([
            'photo' => 'required|image',
        ]);
        $photo_path = public_path('admin/users/'.$user->photo);
        if ($user->photo && file_exists($photo_path)) {
            unlink($photo_path);
        }
        $photo = $request->file('photo');
        $photo_name = "user_" . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('admin/users'), $photo_name);
        $user->update([
            'photo' => $photo_name,
            'updated_at' => Carbon::now(),
        ]);
        return back()->with('user_photo', 'User Photo Updated');
    }
}
