@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between items-center">
                    <h4>Product List</h4>
                    <a href="{{route('Product.add')}}" class="btn btn-primary">Add Product</a>
                </div>
                <div class="card-body">
                    <table class="table table-bordered" id="dataTable">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Discount</th>
                                <th>Aff_Disc Price</th>
                                <th>Sold Count</th>
                                <th>Status</th>
                                <th>Disc30%</th>
                                <th>Disc50%</th>
                                <th>Disc70%</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($products as $sl => $product)
                                <tr>
                                    <td>{{$sl + 1}}</td>
                                    <td class="text-wrap">{{$product->product_name}}</td>
                                    <td>{{$product->pro_to_cate->name}}</td>
                                    <td>
                                        @if ($product->discount)
                                            {{$product->discount}}%
                                        @else
                                            0
                                        @endif
                                    </td>
                                    <td>{{$product->after_discount}}</td>
                                    <td>{{$product->sold_count}}</td>
                                    <td>
                                        <input type="checkbox" {{$product->status == 1 ? 'checked' : ''}}
                                            data-id="{{$product->id}}" class="status" value="{{$product->status}}"
                                            data-toggle="toggle">
                                    </td>
                                    <td>
                                        <input type="checkbox" {{$product->discount30 == 1 ? 'checked' : ''}}
                                            data-id="{{$product->id}}" class="discount30" value="{{$product->discount30}}"
                                            data-toggle="toggle">
                                    </td>
                                    <td>
                                        <input type="checkbox" {{$product->discount50 == 1 ? 'checked' : ''}}
                                            data-id="{{$product->id}}" class="discount50" value="{{$product->discount50}}"
                                            data-toggle="toggle">
                                    </td>
                                    <td>
                                        <input type="checkbox" {{$product->discount70 == 1 ? 'checked' : ''}}
                                            data-id="{{$product->id}}" class="discount70" value="{{$product->discount70}}"
                                            data-toggle="toggle">
                                    </td>
                                    <td>
                                        <a href="{{route('inventory', $product->id)}}" class="btn btn-secondary btn-icon">
                                            <i data-feather="layers"></i>
                                        </a>
                                        <a href="" class="btn btn-primary btn-icon">
                                            <i data-feather="edit"></i>
                                        </a>
                                        <a href="" class="btn btn-danger btn-icon">
                                            <i data-feather="trash"></i>
                                        </a>
                                    </td>

                                </tr>
                            @empty
                                <tr>
                                    <td colspan="11" class="text-danger text-center">Product not found</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    <script>
        $(document).ready(function () {
            $('#dataTable').DataTable();
        });
        $('.status').change(function () {
            var product_id = $(this).attr('data-id');
            var status = $(this).is(':checked') ? 1 : 0;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/product/getstatus',
                data: {
                    'product_id': product_id,
                    'status': status
                },
                success: function (data) {

                }
            });
        })
        $('.discount30').change(function () {
            var product_id = $(this).attr('data-id');
            var status = $(this).is(':checked') ? 1 : 0;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/product/discount30',
                data: {
                    'product_id': product_id,
                    'status': status
                },
                success: function (data) {

                }
            });
        })
        $('.discount50').change(function () {
            var product_id = $(this).attr('data-id');
            var status = $(this).is(':checked') ? 1 : 0;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/product/discount50',
                data: {
                    'product_id': product_id,
                    'status': status
                },
                success: function (data) {

                }
            });
        })
        $('.discount70').change(function () {
            var product_id = $(this).attr('data-id');
            var status = $(this).is(':checked') ? 1 : 0;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/product/discount70',
                data: {
                    'product_id': product_id,
                    'status': status
                },
                success: function (data) {

                }
            });
        })
    </script>
@endsection