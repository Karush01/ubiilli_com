<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{{Lang::get('admin.admin')}}</title>
    <link rel="icon" href="{{asset('favicon.png')}}" type="image/x-icon"/>
    <!-- Fonts -->
    <link href="{{mix('css/admin.css')}}" rel="stylesheet"/>
</head>
<body>

<div class="content   mh-100" id="root"></div>
<script type="text/javascript">
    _sharedData = {
        "loc": {
            "admin": {!! json_encode( Lang::get('admin') ) !!}
        },
        "locale": {!! json_encode( Session::get( env('SESSION_LOCALE') ) ) !!},
        "currencies":  {!! \App\Models\Currency::all() -> toJson() !!},
        "languages": {!!  \App\Models\Language::all()->toJson() !!},
        "siteLink": "{!! env('APP_URL') !!}"
    }
</script>
<script type="text/javascript" src="{{mix('js/admin.js')}}"></script>
</body>
</html>
