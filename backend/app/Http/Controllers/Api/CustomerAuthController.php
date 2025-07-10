<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:6'
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $customer->createToken('customer-token')->plainTextToken;

        return response()->json([
            'customer' => $customer,
            'token' => $token,
            'message' => 'Registartion Successfull!'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        try {
            $customer = Customer::where('email', $request->email)->first();

            if (!$customer || !Hash::check($request->password, $customer->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $token = $customer->createToken('customer-token')->plainTextToken;

            return response()->json([
                'status' => true,
                // 'customer' => $customer,
                'customer' => [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'number' => $customer->number,
                    'address' => $customer->address,
                    'zip' => $customer->zip,
                    'photo' => $customer->photo,
                    'photo_url' => $customer->photo ? asset('admin/customer/' . $customer->photo) : '',
                ],
                'token' => $token,
                'message' => 'Login Successfully!'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out']);
    }
    public function update(Request $request)
    {
        $user =  Customer::find($request->id);
        $photo_url = '';
        try {
            if ($user) {
                if ($request->hasFile('photo')) {
                    $photo_path = public_path('admin/customer/' . $user->photo);
                    if ($user->photo && file_exists($photo_path)) {
                        unlink($photo_path);
                    }
                    $photo = $request->file('photo');
                    $photo_name = "Customer_" . time() . uniqid() . '.' . $photo->getClientOriginalExtension();
                    $photo_url = $photo_name;
                    $photo->move(public_path('admin/customer/'), $photo_name);

                    $user->update([
                        'name' => $request->name,
                        'number' => $request->number,
                        'zip' => $request->zip,
                        'address' => $request->address,
                        'photo' => $photo_name,
                        'updated_at' => Carbon::now(),
                    ]);
                    return response()->json([
                        'status' => true,
                        'photo_path' => $photo_url && $user->photo
                            ? "http://127.0.0.1:8000/admin/customer/{$photo_url}"
                            : "http://127.0.0.1:8000/admin/customer/{$user->photo}",
                        'message' => 'User Info Update Successfull!'
                    ]);
                } else {
                    $user->update([
                        'name' => $request->name,
                        'number' => $request->number,
                        'zip' => $request->zip,
                        'address' => $request->address,
                        'updated_at' => Carbon::now(),
                    ]);
                    return response()->json([
                        'status' => true,
                        'message' => 'User Info Update Successfull!'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Something is wrong'
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }
}
