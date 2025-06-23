@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8"></div>
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
                            <input type="file" name="banner_photo" class="form-control" id="" onchange="document.getElementById('banner_img').src=window.URL.createObjectURL(this.files[0])">
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