<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'The :attribute must be accepted.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
    'alpha' => 'The :attribute may only contain letters.',
    'alpha_dash' => 'The :attribute may only contain letters, numbers, dashes and underscores.',
    'alpha_num' => 'The :attribute may only contain letters and numbers.',
    'array' => 'The :attribute must be an array.',
    'before' => 'The :attribute must be a date before :date.',
    'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => 'The :attribute must be between :min and :max kilobytes.',
        'string' => 'The :attribute must be between :min and :max characters.',
        'array' => 'The :attribute must have between :min and :max items.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'date' => 'The :attribute is not a valid date.',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'The :attribute must be a valid email address.',
    'ends_with' => 'The :attribute must end with one of the following: :values.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'The :attribute must be an integer.',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => 'The :attribute must be less than or equal :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file' => 'The :attribute may not be greater than :max kilobytes.',
        'string' => 'The :attribute may not be greater than :max characters.',
        'array' => 'The :attribute may not have more than :max items.',
    ],
    'mimes' => 'The :attribute must be a file of type: :values.',
    'mimetypes' => 'The :attribute must be a file of type: :values.',
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'The :attribute must be a number.',
    'password' => 'The password is incorrect.',
    'present' => 'The :attribute field must be present.',
    'regex' => 'The :attribute format is invalid.',
    'required' => 'The :attribute field is required.',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values.',
    'string' => 'The :attribute must be a string.',
    'timezone' => 'The :attribute must be a valid zone.',
    'unique' => 'The :attribute has already been taken.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute format is invalid.',
    'uuid' => 'The :attribute must be a valid UUID.',
    'captcha' => 'Une erreur de serveur',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
        'signup' => [
            'first_name' => [
                'required' => 'Saisissez votre nom',
                'min' => 'Le nombre minimale de caractère du nom  :min '
            ],
            'email' => [
                'required' => 'Saisissez votre e-mail',
                'email' => 'Veuillez saisir correctement e-mail',
                'unique' => "L'utilisateur avec cet e-mail est déjà enregistré dans le système",
            ],
            'password' => [
                'required' => 'Entrer le mot de passe',
                'min' => 'Le nombre minimale de caractère du mot de passe doit être de - :min ',
                'confirmed' => 'Le mot de passe saisi est incorrect.

'
            ],
            'user_type' => [
                'required' => 'Une erreur de serveur',
                'integer' => 'Une erreur de serveur',
                'exists' => 'Une erreur de serveur',
            ],
            'google_token' => [
                'required' => "Passez le contrôle que vous n'êtes pas un robot",
            ]
        ],
        'signin' => [
            'email' => [
                'required' => "Entrer l'adresse e-mail",
                'email' => 'Entrer un email valide'
            ],
            'password' => [
                'required' => 'Entrer le mot de passe'
            ]
        ],
        'social' => [
            'provider' => [
                'required' => 'Une erreur de serveur',
                'exists' => 'Une erreur de serveur',
            ],
            'token' => [
                'required' => 'Une erreur de serveur'
            ],
            'user_type' => [
                'required' => 'Une erreur de serveur',
                'integer' => 'Une erreur de serveur',
                'exists' => 'Une erreur de serveur',
            ]
        ],
        'order' => [
            'name' => [
                'required' => 'Votre prénom',
                'min' => 'Le nombre minimale de caractère du prénom :min',
            ],
            'phone' => [
                'required' => 'Votre numéro de téléphone',
                'numeric' => 'Номер телефона должен быть целым числом',
                'digits_between' => 'Une erreur de serveur'
            ],
            'place_id' => [
                'required' => 'Une erreur de serveur',
                'integer' => 'Une erreur de serveur',
                'exists' => 'Une erreur de serveur'
            ],
            'delivery' => [
                'required' => 'Une erreur de serveur',
                'boolean' => 'Une erreur de serveur'
            ],
            'date' => [
                'required_if' => 'Une erreur de serveur'
            ],
            'time' => [
                'required_if' => 'Une erreur de serveur'
            ],
            'persons' => [
                'required_if' => 'Une erreur de serveur',
                'max' => 'Le nombre de personne :max'
            ],
            'smokers' => [
                'boolean' => 'Une erreur de serveur'
            ],
            'comment' => [
                'max' => 'Le nombre minimale de caractère du commentaire :max '
            ],
            'address' => [
                'required_if' => "Saisissez l'adresse de livraison . ",
                'max' => "Le nombre minimale de caractère de l'adresse du livraison doit comporter au :max "
            ],
        ],
        'update_info' => [
            'first_name' => [
                'required' => 'Saisissez votre nom',
                'min' => 'Le nombre minimale de caractère doit être de: min'
            ],
            'last_name' => [
                'required' => 'Entrer votre nom de famille',
                'min' => 'Le nombre minimale de caractère doit être de:min'
            ],
            'email' => [
                'required' => "Entrer l'adresse e-mail",
                'email' => 'Entrer un email valide',
                'unique' => "L'utilisateur avec cet e-mail est déjà enregistré dans le site",
            ],
            'phone' => [
                'required' => 'Saisissez votre numéro de téléphone',
                'integer' => "Ce numéro de téléphone n'est pas valide",
            ]
        ],
        'user_data' => [
            'first_name' => [
                'required' => 'Saisissez votre nom',
                'min' => 'Le nombre minimale de caractère doit être de: min'
            ],
            'last_name' => [
                'required' => 'Entrer votre nom de famille',
                'min' => 'Le nombre minimale de caractère doit être de:min'
            ],
            'email' => [
                'required' => "Entrer l'adresse e-mail",
                'email' => 'Entrer un email valide',
                'unique' => "L'utilisateur avec cet e-mail est déjà enregistré dans le site",
            ],
            'phone' => [
                'required' => 'Saisissez votre numéro de téléphone',
                'integer' => "Ce numéro de téléphone n'est pas valide",
            ],
            'active' => [
                'required' => 'Une erreur de serveur',
                'boolean' => 'Une erreur de serveur',
            ],
            'iban' => [
                'id' => [
                    'required' => 'Произошла ошибка сервера',
                    'integer' => 'Произошла ошибка сервера',
                    'exists' => 'Произошла ошибка сервера',
                ],
                'iban' => [
                    'required' => 'Введите номер банковского аккаунта',
                    'min' => 'Номер банковского аккаунта должен иметь длину :min символа',
                    'max' => 'Номер банковского аккаунта должен иметь длину :min символа',
                ],
                'verified' => [
                    'required' => 'Произошла ошибка сервера',
                    'boolean' => 'Произошла ошибка сервера',
                ]
            ]
        ],
        'update_password' => [
            'old_password' => [
                'required' => 'Saisissez votre ancien mot de passe',
                'min' => 'Le nombre minimale de caractère du mot de passe doit être de - :min ',
            ],
            'new_password' => [
                'required' => 'Entrer un nouveau mot de passe',
                'min' => 'Le nombre minimale de caractère du mot de passe doit être de - :min ',
            ],
        ],
        'place' => [
            'name' =>
                [
                    'required' => 'Saisissez le nom du restaurant',
                    'min' => 'Le nombre minimale de caractère du nom du restaurant doit être de :min ',
                    'max' => 'Le nombre maximale de caractère du nom du restaurant ne doit pas dépasser :max ',
                ],
            'description' =>
                [
                    'required' => 'Saisissez une description du restaurant',
                    'min' => 'Le nombre minimale de caractère de la description du restaurant doit être de :min ',
                ],
            'city_id' =>
                [
                    'required' => 'Sélectionnez une ville',
                    'integer' => 'Une erreur de serveur',
                    'exists' => 'Une erreur de serveur',
                ],
            'type_id' =>
                [
                    'required' => 'Choisissez le type de restaurant',
                    'integer' => 'Une erreur de serveur',
                    'exists' => 'Une erreur de serveur',
                ],
            'delivery' =>
                [
                    'required' => 'Une erreur de serveur',
                    'boolean' => 'Une erreur de serveur',
                ],
            'middle_price' =>
                [
                    'required' => 'Prix moyen ',
                    'numeric' => 'Le prix moyen doit être écrit seulement avec des chiffres',
                ],
            'tables_count' =>
                [
                    'required' => 'Saisissez le nombre de tables',
                    'integer' => 'Le nombre de tables doit être écrit seulement avec des chiffres',
                ],
            'tables_seats' =>
                [
                    'required' => 'Saisissez le nombre de places',
                    'integer' => 'Le nombre de places doit être écrit seulement avec des chiffres',
                ],
            'zip' =>
                [
                    'required' => 'Saisissez Code Postal',
                    'min' => 'Le nombre minimale de caractère du Code Postal doit être de :min ',
                ],
            'address' =>
                [
                    'required' => 'Saisissez adresse du restaurant',
                    'min' => "Le nombre minimale de caractère de l'adresse du restaurant doit être de :min ",
                ],
            'latitude' =>
                [
                    'required' => 'Sélectionnez un emplacement sur la carte',
                    'numeric' => 'Une erreur de serveur',
                ],
            'longitude' =>
                [
                    'required' => 'Sélectionnez un emplacement sur la carte',
                    'numeric' => 'Une erreur de serveur',
                ],
            'phone' => [
                'required' => 'Entrez votre numéro de téléphone',
                'integer' => 'Le numéro de téléphone doit être écrit en toutes chiffres. Sans espace ni de tiré ',
            ]
        ],
        'kitchens' => [
            'array' => 'Une erreur de serveur',
            'min' => 'Choisissez une cuisine',
        ],
        'kitchens.*' => [
            'integer' => 'Une erreur de serveur',
            'exists' => 'Une erreur de serveur',
        ],
        'pictures' => [
            'array' => 'Une erreur de serveur',
            'min' => 'Vous devez ajouter au moins :min Photos'
        ],
        'options' => [
            'array' => 'Une erreur de serveur',
            'min' => 'Une erreur de serveur',
        ],
        'options.*' => [
            'integer' => 'Une erreur de serveur',
            'exists' => 'Une erreur de serveur',
        ],
        'menu' => [
            'array' => 'Une erreur de serveur',
            'min' => 'Complétez la carte du restaurant',
        ],
        'menu.*.name' => [
            'required' => 'Remplissez le nom de tous les plats',
            'min' => 'Le nom du plat doit avoir au moins :min',
        ],
        'menu.*.description' => [
            'required' => 'Remplissez la description de tous les plats',
            'min' => 'La description du plat doit avoir au moins :min',
        ],
        'menu.*.price' => [
            'required' => 'Entrez le prix de tous les plats',
            'numeric' => 'Le prix du plat doit être un nombre',
            'min' => 'Le prix du plat ne doit pas dépassé 1',
        ],
        'menu.*.menu_category_id' => [
            'required' => 'Sélectionnez une catégorie pour tous les plats',
            'integer' => 'Une erreur de serveur',
            'exists' => 'Une erreur de serveur',
        ],
        'place_schedule' => [
            'array' => 'Une erreur de serveur',
            'size' => 'Une erreur de serveur',
            '*.day_id' => [
                'required' => 'Une erreur de serveur',
                'integer' => 'Une erreur de serveur',
                'exists' => 'Une erreur de serveur',
            ],
            '*.open' => [
                'date_format' => 'Une erreur de serveur',
            ],
            '*.close' => [
                'date_format' => 'Une erreur de serveur',
            ],
            '*.active' => [
                'required' => 'Une erreur de serveur',
                'boolean' => 'Une erreur de serveur',
            ],
        ],
        'menu_data' => [
            'place_id' => [
                'required' => 'Une erreur de serveur',
                'integer' => 'Une erreur de serveur',
            ],
            'menu' => [
                'id' => [
                    'required' => 'Une erreur de serveur',
                    'integer' => 'Une erreur de serveur',
                    'exists' => 'Une erreur de serveur',
                ],

                'name' => [
                    'required' => 'Remplissez le nom du plat',
                    'min' => 'Le nombre minimale de caractère doit être de :min ',
                ],
                'description' => [
                    'required' => 'Remplissez la description du plat',
                    'min' => 'Le nombre minimale de caractère doit être de :min',
                ],
                'price' => [
                    'required' => 'Entrez le prix du plat',
                    'numeric' => 'Le prix du plat doit être un nombre',
                    'min' => 'Le prix du plat doit être plus de 1',
                ],
                'menu_category_id' => [
                    'required' => 'Sélectionnez une catégorie pour le plat',
                    'integer' => 'Sélectionnez une catégorie pour le plat',
                    'exists' => 'Une erreur de serveur',
                ],
            ]
        ],
    ],


    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [

    ],


];
