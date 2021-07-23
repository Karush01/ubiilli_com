<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>{{ $meta['title'] }} | {{Lang::get('app.name')}}</title>
    <link rel="icon" href="{{asset('favicon.png')}}" type="image/x-icon"/>
    <meta data-react-helmet="true" content='{{ $meta['description'] }}' property='og:description'/>
    <meta data-react-helmet="true" content='{{ $meta['keywords'] }}' property='og:keywords'/>
    <meta data-react-helmet="true" content='{{ $meta['title'] }} | {{Lang::get('app.name')}}' property='og:title'/>
    <link rel="stylesheet" href="{{mix('css/app.css')}}"/>

    <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"></script>
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body>
<div class="content" id="root"></div>
<script type="text/javascript">
    _sharedData = {
        "loc": {
            "app": {!! json_encode( Lang::get('app')) !!},
            "tooltips": {!! json_encode( Lang::get('tooltips')) !!},
        },
        "locale": {!! json_encode( Session::get( env('SESSION_LOCALE') ) ) !!},
        "userTypes": {!! json_encode( \App\Models\User_type::getItems( false ) ) !!},
        "currencies": {!! \App\Models\Currency::getCurrency()->toJson() !!},
        "socialProviders": {!! \App\Models\Social_provider::getItems()->toJson() !!},
        "socials": {!! \App\Models\Social::get_items()->toJson() !!},
        "cities": {!! \App\Models\City_description::getItems(Session::get( env('SESSION_LOCALE') )['id'])->toJson() !!},
        "meta": {!!json_encode( $meta ) !!},
        "currentDate": {!! json_encode( \Carbon\Carbon::now()->startOfDay() ) !!},
        "pages": {!! \App\Models\Page::getShortList(Session::get( env('SESSION_LOCALE') )['id'] )->toJson() !!},
        "mapsKey": "{!! env('GOOGLE_MAPS_API_KEY') !!}",
        "stripeKey": {!! json_encode(env('STRIPE_KEY')) !!},
        "reCaptchaKey": {!! json_encode(env('GOOGLE_CAPTCHA_PUBLIC_KEY'))  !!}
    }
</script>


<script type="text/javascript" src="{{mix('js/app.js')}}"></script>
</body>
</html>
