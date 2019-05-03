@extends('layouts.app')

@section('content')
    <div id="content">
        <medico-form></medico-form>
    </div>
@endsection

@push('scripts')
    <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
    <script type="text/javascript" src="{{ mix('js/vendor.js') }}"></script>
    <script type="text/javascript" src="{{ mix('js/manifest.js') }}"></script>
@endpush
