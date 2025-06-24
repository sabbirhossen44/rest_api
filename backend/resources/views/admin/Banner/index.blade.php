@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4>Banner List</h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <tr>
                            <th>SL</th>
                            <th>Photo</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($banners as $sl => $banner)
                            <tr>
                                <td>{{$sl + 1}}</td>
                                <td>
                                    <img src={{asset('admin/banner/' . $banner->photo)}} alt="">
                                </td>
                                <td>
                                    <label>
                                        <input type="checkbox" {{$banner->status == 1 ? 'checked' : ''}} data-id="{{$banner->id}}"
                                            data-toggle="toggle" class="status" value="{{$banner->status}}">
                                    </label>
                                </td>
                                <td>
                                    <a href="{{route('banner.edit', $banner->id)}}" class="btn btn-primary btn-icon">
                                        <i data-feather="edit"></i>
                                    </a>
                                    <a data-link="{{route('banner.delete' , $banner->id)}}" class="btn btn-danger btn-icon banner_det">
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
                    <h4>New Banner</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('banner.store')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Banner Photo</label>
                            <input type="file" name="banner_photo" class="form-control" id=""
                                onchange="document.getElementById('banner_img').src=window.URL.createObjectURL(this.files[0])">
                            <div class="mt-3">
                                <img src="" class="w-full img-fluid" id="banner_img" alt="">
                            </div>
                            @error('banner_photo')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Add Banner</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    <script>
        $('.banner_det').click(function (e) {
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
        $('.status').change(function () {
            var banner_id = $(this).attr('data-id');
            var status = $(this).is(':checked') ? 1 : 0;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/banner/status',
                data: {
                    'banner_id': banner_id,
                    'status': status
                },
                success: function (data) {

                }
            });
        })
    </script>
    @if (session('banner_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('banner_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('banner_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('banner_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection