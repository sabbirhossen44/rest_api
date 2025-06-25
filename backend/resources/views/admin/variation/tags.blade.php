@extends('layouts.master')
@section('content')
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h3>Tag List</h3>
                </div>
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <tr>
                            <th>SL</th>
                            <th>Tags Name</th>
                            <th>Action</th>
                        </tr>
                        @foreach ($tags as $sl => $tag)
                            <tr>
                                <td>{{$tags->firstItem() + $sl}}</td>
                                <td>{{$tag->tag_name}}</td>
                                
                                <td>
                                    <a data-link="{{route('tag.delete', $tag->id)}}"
                                        class="btn btn-danger btn-icon tag_del">
                                        <i data-feather="trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="mt-3 d-flex justify-content-end">
                        {{$tags->links()}}
                    </div>
                </div>
            </div>

        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>New Color</h4>
                </div>
                <div class="card-body">
                    <form action="{{route('tag.store')}}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="" class="form-label">Tag Name</label>
                            <input type="text" name="tag_name" class="form-control" id="">
                            @error('tag_name')
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
        
        $('.tag_del').click(function (e) {
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
    @if (session('tag_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('tag_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    @if (session('tag_delete'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('tag_delete') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
   
@endsection