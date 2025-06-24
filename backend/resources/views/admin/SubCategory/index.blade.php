@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="row">
                @foreach ($categories as $category)
                    <div class="col-lg-6">
                        <div class="card mt-3">
                            <div class="card-header">
                                <h5>{{$category->name}}</h5>
                            </div>
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <tr>
                                        <th>SubCategory Name</th>
                                        <th>Action</th>
                                    </tr>
                                    @foreach (App\Models\SubCategory::where('category_id', $category->id)->get() as $subCategory)
                                        <tr>
                                            <td>{{$subCategory->name}}</td>
                                            <td>
                                                <a data-link="{{route('subCategory.delete', $subCategory->id)}}"
                                                    class="btn btn-danger btn-icon subcategory_del">
                                                    <i data-feather="trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </table>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>New SubCategory</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('subCategory.store')}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Category</label>
                            <select name="category_id" id="" class="form-control">
                                <option value="">Select Category</option>
                                @foreach ($categories as $category)
                                    <option value="{{$category->id}}">{{$category->name}}</option>
                                @endforeach
                            </select>
                            @error('category')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Sub-Category Name</label>
                            <input type="text" name="subCategory" id="" class="form-control">
                            @error('subCategory')
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
        $('.subcategory_del').click(function (e) {
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
    @if (session('subCategory_store'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('subCategory_store') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('sub_Category_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('sub_Category_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection