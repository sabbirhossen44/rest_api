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
                'customer' => $customer,
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
    public function update(Request $request){
       $user =  Customer::find($request->id);
        try {
            if ($user ) {
                $user->update([
                    'name' => $request->name,
                    'number' => $request->number,
                    'zip' => $request->zip,
                    'address' => $request->address,
                    'updated_at' => Carbon::now(),
                ]);
                return response()->json([
                    'statu' => true,
                    'message' => 'User Info Update Successfull!'
                ]);
            }else {
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
