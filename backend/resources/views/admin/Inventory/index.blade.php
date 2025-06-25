@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4>{{$product->product_name}}</h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <tr>
                            <th>SL</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($inventries as $sl => $inventry)
                            <tr>
                                <td>{{$sl + 1}}</td>
                                <td>{{$inventry->inv_to_size->size_name}}</td>
                                <td>{{$inventry->inv_to_color->color_name}}</td>
                                <td>{{$inventry->quantity}}</td>
                                <td>
                                    <a data-link="{{route('inventory.delete', $inventry->id)}}"
                                        class="btn btn-danger btn-icon inventory_del">
                                        <i data-feather="trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h3>Inventory Add</h3>
                </div>
                <div class="card-body">
                    <form action="{{route('inventory.store', $product->id)}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Size</label>
                            <select name="size_id" class="form-control" id="">
                                <option value="">Select Size</option>
                                @foreach ($sizes as $size)
                                    <option value="{{$size->id}}">{{$size->size_name}}</option>
                                @endforeach
                            </select>
                            @error('size_id')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Color</label>
                            <select name="color_id" class="form-control" id="">
                                <option value="">Select Size</option>
                                @foreach ($colors as $color)
                                    <option value="{{$color->id}}">{{$color->color_name}}</option>
                                @endforeach
                            </select>
                            @error('color_id')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Quantity</label>
                            <input type="number" name="quantity" class="form-control" id="">
                            @error('quantity')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <a href="{{route('product.list')}}" class="btn btn-secondary">Product List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    @if (session('inventory_store'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('inventory_store') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('inventory_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('inventory_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    <script>
        $('.inventory_del').click(function (e) {
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