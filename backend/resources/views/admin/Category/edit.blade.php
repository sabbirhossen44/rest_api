@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h4>Update Category</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('category.update', $category->id)}}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="mb-3">
                            <label for="" class="form-label">Category Name</label>
                            <input disabled type="text" name="name" class="form-control" value="{{$category->name}}" id="">
                            @error('name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Category Photo</label>
                            <input type="file" name="photo" class="form-control" id="" onchange="document.getElementById('category_photot').src = window.URL.createObjectURL(this.files[0])">
                            @error('photo')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                            <div class="mt-2">
                                <img src={{asset('admin/category/'.$category->photo)}} class="w-25" id="category_photot" alt="">
                            </div>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Update</button>
                            <a href="{{route('category.index')}}" class="btn btn-secondary">Back</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    @if (session('category_update'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('category_update') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection