@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4>Contact Message List</h4>
                </div>
                <div class="card-body">
                    <table id="messageTable" class="display">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Service Type</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($messages as $sl => $message)
                                <tr>
                                    <td>{{$sl + 1}}</td>
                                    <td>{{$message->name}}</td>
                                    <td>{{$message->email}}</td>
                                    <td>{{$message->address}}</td>
                                    <td>{{$message->service}}</td>
                                    <td class="text-wrap">{{$message->message}}</td>
                                    <td>{{$message->created_at->diffForHumans()}}</td>
                                    <td>
                                        <a data-link="{{route('customer.message.delete', $message->id)}}"
                                            class="btn btn-danger btn-icon category_del">
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
            $('#messageTable').DataTable();
        });
    </script>
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
    @if (session('delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
@endsection