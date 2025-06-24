@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4>Category List</h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <tr>
                            <th>SL</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($categories as $sl => $category)
                            <tr>
                                <td>{{$categories->firstItem() + $sl}}</td>
                                <td>
                                    <img src={{asset('admin/category/' . $category->photo)}} alt="">
                                </td>
                                <td>{{$category->name}}</td>
                                <td>
                                    <a href="{{route('category.edit', $category->id)}}" class="btn btn-primary btn-icon">
                                        <i data-feather="edit"></i>
                                    </a>
                                    <a data-link="{{route('category.delete', $category->id)}}" class="btn btn-danger btn-icon category_del">
                                        <i data-feather="trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="mt-2 d-flex justify-content-end">
                        {{$categories->links()}}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>Add New Category</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('category.store')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Category Name</label>
                            <input type="text" name="name" class="form-control" id="">
                            @error('name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Category Photo</label>
                            <input type="file" name="photo" class="form-control" id="">
                            @error('photo')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    <script>
        $('.category_del').click(function (e) {
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
    @if (session('add_category'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('add_category') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('category_trasted'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('category_trasted') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection