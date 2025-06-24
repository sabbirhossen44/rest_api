@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h4>Banner Image Update</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('banner.update', $banner->id)}}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="mb-3">
                            <label for="" class="form-label">Banner Photo</label>
                            <input type="file" name="photo" class="form-control" id=""
                                onchange="document.getElementById('banner_img').src = window.URL.createObjectURL(this.files[0])">
                            @error('photo')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                            <div class="mt-2">
                                <img src="{{asset('admin/banner/' . $banner->photo)}}" class="img-fluid" id="banner_img"
                                    alt="">
                            </div>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Update</button>
                            <a href="{{route('banner.index')}}" class="btn btn-secondary">Back</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    @if (session('banner_update'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('banner_update') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection