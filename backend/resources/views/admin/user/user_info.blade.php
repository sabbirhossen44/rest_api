@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>User Info</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('user.info.update', $user->id)}}" method="post" >
                        @csrf
                        <div class="mb-3">
                            <label for="text" class="form-label">User Name</label>
                            <input type="text" name="name" class="form-control" value='{{$user->name}}' id="">
                            @error('name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="text" class="form-label">User Email</label>
                            <input disabled type="email" name="email" class="form-control" value='{{$user->email}}' id="">
                            @error('email')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>User Photo</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('user.photo.update', $user->id)}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label for="text" class="form-label">User Photo</label>
                            <input type="file" name="photo" class="form-control" value='{{$user->name}}' id=""
                                onchange="document.getElementById('photo').src=window.URL.createObjectURL(this.files[0])">
                            <div class="mt-3">
                                @if ($user->photo)
                                    <img src="{{asset('admin/users/' . $user->photo)}}" width="100px" height="100px"
                                        style="border-radius: 100%; object-fit: cover; border: none;" id="photo" alt="">
                                @endif
                            </div>
                            @error('photo')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    @if (session('user_info'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('user_info') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('user_photo'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('user_photo') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection