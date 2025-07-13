@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h4>Subscribe List</h4>
                </div>
                <div class="card-body">
                    <table id="myTable" class="display">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($subscribe as $sl => $data)
                                <tr>
                                    <td>{{$sl + 1}}</td>
                                    <td>{{$data->email}}</td>
                                    <td>
                                        <a data-link="{{route('subscribe.delete', $data->id)}}"
                                            class="btn btn-danger btn-icon subscribe_del">
                                            <i data-feather="trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    <script>
        $(document).ready(function () {
            $('#myTable').DataTable();
        });
    </script>
    <script>
        $('.subscribe_del').click(function (e) {
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
    @if (session('Subscribe_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{session('Subscribe_delete')}}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection