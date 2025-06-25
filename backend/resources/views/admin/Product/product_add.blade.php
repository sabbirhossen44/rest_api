@extends('layouts.master')
@section('style')
    <style>
        .upload__box {
            /* padding: 40px; */
        }

        .upload__inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .upload__btn {
            display: block;
            font-weight: 600;
            text-align: left;
            min-width: 116px;
            padding: 7px;
            transition: all 0.3s ease;
            cursor: pointer;
            border: 2px solid;
            background-color: transparent;
            border-color: #f2f2f2;
            line-height: 26px;
            font-size: 14px;
            color: #000000c9;
        }

        .upload__btn:hover {
            background-color: unset;
            color: #4045ba;
            transition: all 0.3s ease;
        }

        .upload__btn-box {
            margin-bottom: 10px;
        }

        .upload__img-wrap {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -10px;
        }

        .upload__img-box {
            width: 200px;
            padding: 0 10px;
            margin-bottom: 12px;
        }

        .upload__img-close {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 10px;
            right: 10px;
            text-align: center;
            line-height: 28px;
            z-index: 1;
            cursor: pointer;
        }

        .upload__img-close::after {
            content: "✖";
            font-size: 14px;
            color: white;
        }

        .img-bg {
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: relative;
            padding-bottom: 100%;
        }
    </style>
@endsection
@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between items-center">
                    <h4>New Product</h4>
                    <a href="{{route('product.list')}}" class="btn btn-primary ">Produc List</a>
                </div>
                <div class="card-body">
                    <form action="{{route('product.store')}}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Category</label>
                                    <select name="category_id" class="form-control category" id="">
                                        <option value="">Select Category</option>
                                        @foreach ($categories as $category)
                                            <option value="{{$category->id}}">{{$category->name}}</option>
                                        @endforeach
                                    </select>
                                    @error('category_id')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Sub Category</label>
                                    <select name="subcategory_id" class="form-control subcategory" id="">
                                        <option value="">Select Sub_Category</option>
                                        @foreach ($subcategories as $subcategory)
                                            <option value="{{$subcategory->id}}">{{$subcategory->name}}</option>
                                        @endforeach
                                    </select>
                                    @error('subcategory_id')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Brand</label>
                                    <select name="brand_id" class="form-control" id="">
                                        <option value="">Select Brand Name</option>
                                        @foreach ($brands as $brand)
                                            <option value="{{$brand->id}}">{{$brand->brand_name}}</option>
                                        @endforeach
                                    </select>
                                    @error('brand_id')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Product Name</label>
                                    <input type="text" name="product_name" class="form-control" id="">
                                    @error('product_name')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Price</label>
                                    <input type="number" name="price" class="form-control" id="">
                                    @error('price')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Discount(%)</label>
                                    <input type="number" name="discount" class="form-control" id="">
                                    @error('discount')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label for="" class="form-label">Tages</label>
                                    <select id="select-gear" name="tags[]" class="demo-default tages_id" multiple
                                        placeholder="Select gear...">
                                        <option value="">Select tags</option>
                                        <optgroup label="tags">
                                            @foreach ($tags as $tag)
                                                <option value="{{$tag->id}}">{{$tag->tag_name}}</option>
                                            @endforeach
                                        </optgroup>
                                    </select>
                                    @error('tages_id')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label for="" class="form-label">Short description</label>
                                    <input type="text" name="short_des" class="form-control" id="">
                                    @error('short_des')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label for="" class="form-label">Long description</label>
                                    <textarea class="summernote" name="long_des"></textarea>
                                    @error('long_des')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label for="" class="form-label">Additional info</label>
                                    <textarea class="summernote" name="addi_info"></textarea>
                                    @error('addi_info')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="" class="form-label">Preview Image</label>
                                    <input type="file" name="preview" class="form-control cursor-pointer" id=""
                                        onChange="document.getElementById('preview_img').src = window.URL.createObjectURL(this.files[0])">
                                    @error('preview')
                                        <strong class="text-danger">{{$message}}</strong>
                                    @enderror
                                    <div class="mt-3">
                                        <img src="" width="100px" height="100px" class="object-cover" id="preview_img"
                                            alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">

                                    <div class="upload__box">
                                        <div class="upload__btn-box">
                                            <label for="" class="form-label">Preview Image</label>
                                            <label class="upload__btn">
                                                <p>Upload images</p>
                                                <input type="file" multiple="" data-max_length="20"
                                                    class="upload__inputfile form-control" name="gallery[]">
                                            </label>
                                            @error('gallery')
                                                <strong class="text-danger">{{$message}}</strong>
                                            @enderror
                                        </div>
                                        <div class="upload__img-wrap"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Add New Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('footer_script')
    @if (session('Product_add'))
        <script>
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "{{ session('Product_add') }}",
                showConfirmButton: false,
                timer: 1500
            });
        </script>
    @endif
    <script>
        $(document).ready(function () {
            $('.summernote').summernote();
        });
        $('.category').change(function () {
            var category_id = $(this).val();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/getsubCategory',
                data: { 'category_id': category_id },
                success: function (data) {
                    $('.subcategory').html(data);
                }
            })
        })
        $('#select-gear').selectize({ sortField: 'text' })

        jQuery(document).ready(function () {
            ImgUpload();
        });

        function ImgUpload() {
            var imgWrap = "";
            var imgArray = [];

            $('.upload__inputfile').each(function () {
                $(this).on('change', function (e) {
                    imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
                    var maxLength = $(this).attr('data-max_length');

                    var files = e.target.files;
                    var filesArr = Array.prototype.slice.call(files);
                    var iterator = 0;
                    filesArr.forEach(function (f, index) {

                        if (!f.type.match('image.*')) {
                            return;
                        }

                        if (imgArray.length > maxLength) {
                            return false
                        } else {
                            var len = 0;
                            for (var i = 0; i < imgArray.length; i++) {
                                if (imgArray[i] !== undefined) {
                                    len++;
                                }
                            }
                            if (len > maxLength) {
                                return false;
                            } else {
                                imgArray.push(f);

                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                                    imgWrap.append(html);
                                    iterator++;
                                }
                                reader.readAsDataURL(f);
                            }
                        }
                    });
                });
            });

            $('body').on('click', ".upload__img-close", function (e) {
                var file = $(this).parent().data("file");
                for (var i = 0; i < imgArray.length; i++) {
                    if (imgArray[i].name === file) {
                        imgArray.splice(i, 1);
                        break;
                    }
                }
                $(this).parent().parent().remove();
            });
        }
    </script>
@endsection