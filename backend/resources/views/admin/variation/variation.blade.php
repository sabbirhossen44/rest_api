@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h3>Color List</h3>
                </div>
                <div class="card-body">
                    <table class="table table-light text-center">
                        <tr>
                            <th>SL</th>
                            <th>Color Name</th>
                            <th>Color Code</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($colors as $sl => $color)
                            <tr>
                                <td>{{$colors->firstItem() + $sl}}</td>
                                <td>{{$color->color_name}}</td>
                                <td>
                                    <i
                                        style="display: inline-block; width: 50px; height: 30px; background: {{$color->color_name == 'NA' ? '' : $color->color_code}}; color: {{$color->color_name == 'NA' ? '' : 'transparent'}};">{{$color->color_name == 'NA' ? $color->color_name : 'color'}}</i>
                                </td>
                                <td>
                                    <a data-link="{{route('color.delete', $color->id)}}"
                                        class="btn btn-danger btn-icon color_del">
                                        <i data-feather="trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="mt-3 d-flex justify-content-end">
                        {{$colors->links()}}
                    </div>
                </div>
            </div>


            <div class="card mt-5">
                <div class="card-header">
                    <h3>Size List</h3>
                </div>
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <tr>
                            <th>SL</th>
                            <th>Size Name</th>  
                            <th>Action</th>
                        </tr>
                        @foreach ($sizes as $sl => $size)
                            <tr>
                                <td>{{$sizes->firstItem() + $sl}}</td>
                                <td>{{$size->size_name}}</td>
                                
                                <td>
                                    <a data-link="{{route('size.delete', $size->id)}}"
                                        class="btn btn-danger btn-icon size_del">
                                        <i data-feather="trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="mt-3 d-flex justify-content-end">
                        {{$sizes->links()}}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>New Color</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('color.store')}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Color Name</label>
                            <input type="text" name="color_name" class="form-control" id="">
                            @error('color_name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Color Code</label>
                            <input type="text" name="color_code" placeholder="#ffffff" class="form-control" id="">
                            @error('color_code')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card mt-5">
                <div class="card-header">
                    <h4>New Size</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('size.store')}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Size Name</label>
                            <input type="text" name="size_name" class="form-control" id="">
                            @error('size_name')
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
    <script>
        $('.color_del').click(function (e) {
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
        $('.size_del').click(function (e) {
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
    @if (session('Color_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('Color_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('size_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('size_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('color_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('color_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('size_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('size_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection