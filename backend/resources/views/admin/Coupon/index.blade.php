@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4>Coupon List</h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Limit</th>
                            <th>Discount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($coupons as $sl => $coupon)
                            <tr>
                                <td>{{$coupons->firstItem() + $sl}}</td>
                                <td>{{$coupon->name}}</td>
                                <td>{{$coupon->limit}}</td>
                                <td>{{$coupon->discount}}%</td>
                                <td>{{$coupon->date}}</td>
                                <td>
                                    <input type="checkbox" {{$coupon->status == 1 ? 'checked' : ''}}
                                        data-id="{{$coupon->id}}" class="status" value="{{$coupon->status}}"
                                        data-toggle="toggle">
                                </td>
                                <td>
                                    <a href="{{route('coupon.edit', $coupon->id)}}" class="btn btn-primary btn-icon">
                                        <i data-feather="edit"></i>
                                    </a>
                                    <a data-link="{{route('coupon.delete', $coupon->id)}}" class="btn btn-danger btn-icon coupon_del">
                                        <i data-feather="trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="mt-3 d-flex justify-content-end">
                        {{$coupons->links()}}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>New Coupon</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('coupon.store')}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Copun Name</label>
                            <input type="text" name="name" class="form-control" id="">
                            @error('name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Limit</label>
                            <input type="number" name="limit" class="form-control" id="">
                            @error('limit')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Discount %</label>
                            <input type="number" name="discount" class="form-control" id="">
                            @error('discount')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Date</label>
                            <input type="date" name="date" class="form-control" id="">
                            @error('date')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('footer_script')
    @if (session('coupon_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('coupon_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('coupon_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('coupon_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    <script>
        $('.status').change(function () {
            var coupon_id = $(this).attr('data-id');
            var status = $(this).is(':checked') ? 1 : 0;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/coupon/getstatus',
                data: {
                    'coupon_id': coupon_id,
                    'status': status
                },
                success: function (data) {

                }
            });
        })
    </script>
    <script>
        $('.coupon_del').click(function (e) {
            e.preventDefault();
            var link = $(this).data('link');
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    window.location.href = link;
                }
            });

        })
    </script>
@endsection