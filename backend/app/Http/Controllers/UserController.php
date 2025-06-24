<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
    public function user_photo_update(Request $request, $id)
    {
        $user = User::find($id);
        $request->validate([
            'photo' => 'required|image',
        ]);
        $photo_path = public_path('admin/users/' . $user->photo);
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
    public function user_password(Request $request ,$id){
        $user = User::find($id);
        $request->validate([
            'old_pass' => 'required',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
        ]);
        if (Hash::check($request->old_pass , $user->password)) {
            $user->update([
                'password' => bcrypt($request->password),
                'updated_at' => Carbon::now(),
            ]);
            return back()->with('user_password', 'Password Update Successful!');
        }else{
            return back()->with('user_password_error', 'Old password not match!');
        }
    }
    public function user_list()
    {
        $users = User::latest()->where('id', '!=', Auth::id())->get();
        return view('admin.user.user_list', [
            'users' => $users
        ]);
    }
    public function user_store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);
        User::insert([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'created_at' => Carbon::now(),
        ]);
        return back()->with('user_add', 'User Added Successfully!');
    }
    public function user_delete($id)
    {
        $user = User::find($id);
        $photo_path = public_path('admin/users/' . $user->photo);
        if ($user->photo && file_exists($photo_path)) {
            unlink($photo_path);
        }
        $user->delete();
        return back()->with('user_delete', 'User Delelte Successfully!');
    }
}
