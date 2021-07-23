<?php

return [
    'secret' => env('GOOGLE_CAPTCHA_PRIVATE_KEY'),
    'sitekey' => env('GOOGLE_CAPTCHA_PUBLIC_KEY'),
    'options' => [
        'timeout' => 30,
    ],
];
