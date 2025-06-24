@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4>User List</h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <tr>
                            <th>SL</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Photo</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($users as $sl => $user)
                            <tr>
                                <td>{{$sl +1}}</td>
                                <td>{{$user->name}}</td>
                                <td>{{$user->email}}</td>
                                <td>
                                    @if ($user->photo && file_exists(public_path('admin/users/'.$user->photo)))
                                        <img src={{asset('admin/users/'.$user->photo)}} alt="">
                                    @endif
                                </td>
                                <td>
                                    <a data-link="{{route('user.delete' , $user->id)}}" class="btn btn-danger btn-icon user_det">
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
                    <h4>New User</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('user.store')}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">User Name</label>
                            <input type="text" name="name" class="form-control" placeholder="User Name" id="">
                            @error('name')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">User Email</label>
                            <input type="email" name="email" class="form-control" placeholder="Enter Email" id="">
                            @error('email')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">User Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Enter password" id="">
                            @error('password')
                                <strong class="text-danger">{{$message}}</strong>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Add Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    @if (session('user_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('user_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('user_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('user_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    <script>
        $('.user_det').click(function (e) {
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