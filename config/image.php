<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports "GD Library" and "Imagick" to process images
    | internally. You may choose one of them according to your PHP
    | configuration. By default PHP's "GD Library" implementation is used.
    |
    | Supported: "gd", "imagick"
    |
    */

    'driver' => 'gd',

    'dirs' => [

        'sizes' => [

            'huge' => [

                'dir' => 'huge',

                'width' => null,

                'height' => null,

            ],

            'large' => [

                'dir' => 'large',

                'width' => 640,

                'height' => 480,

            ],

            'medium' => [

                'dir' => 'medium',

                'width' => 360,

                'height' => 270,

            ],

            'small' => [

                'dir' => 'small',

                'width' => 100,

                'height' => 75,

            ]

        ],

        'pictures' => 'pictures',

        'places' => 'places',

        'uploads' => 'uploads',

        'tmp' => 'tmp'

    ]


];
