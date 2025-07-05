@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-6 mx-auto mt-5">
            <div class="card">
                <div class="card-header">
                    <h4>Coupon Edit</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('coupon.update', $coupon->id)}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Copun Name</label>
                            <input type="text" name="name" value="{{$coupon->name}}" class="form-control" id="">
                            @error('name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Limit</label>
                            <input type="number" name="limit" value="{{$coupon->limit}}" class="form-control" id="">
                            @error('limit')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Discount %</label>
                            <input type="number" name="discount" value="{{$coupon->discount}}" class="form-control" id="">
                            @error('discount')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Date</label>
                            <input type="date" name="date" value="{{$coupon->date}}" class="form-control" id="">
                            @error('date')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <a href="{{route('coupon')}}" class="btn btn-secondary">Back</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('footer_script')
    @if (session('coupon_update'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('coupon_update') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection