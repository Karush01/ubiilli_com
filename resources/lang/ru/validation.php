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
    'captcha' => 'Произошла ошибка сервера',

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
        'signup' => [
            'first_name' => [
                'required' => 'Введите ваше имя',
                'min' => 'Длина имени должна быть не менее :min символов'
            ],
            'last_name' => [
                'required' => 'Введите вашу фамилию',
                'min' => 'Длина фамилии должна быть не менее :min символов'
            ],
            'phone' => [
                'required' => 'Введите контактный номер телефона',
                'integer' => 'Номер телефона должен быть целым числом',
                'unique' => 'Пользователь с таким номером телефона уже зарегистрирован в системе',
            ],
            'company_number' => [
                'required' => 'Введите номер компании',
                'integer' => 'Номер компании должен быть целым числом',
                'unique' => 'Компания с таким номером уже зарегистрирована в системе'
            ],
            'email' => [
                'required' => 'Введите Email адрес',
                'email' => 'Введите корректный Email',
                'unique' => 'Пользователь с таким Email уже зарегистрирован в системе',
            ],
            'password' => [
                'required' => 'Введите пароль',
                'min' => 'Минимальная длина пароля - :min символов',
                'confirmed' => 'Пароли не совпадают'
            ],
            'user_type' => [
                'required' => 'Произошла ошибка сервера',
                'integer' => 'Произошла ошибка сервера',
                'exists' => 'Произошла ошибка сервера',
            ],
            'google_token' => [
                'required' => 'Пройдете проверку что вы не робот',
            ]
        ],
        'signin' => [
            'email' => [
                'required' => 'Введите Email адрес',
                'email' => 'Введите корректный Email'
            ],
            'password' => [
                'required' => 'Введите пароль'
            ]
        ],
        'social' => [
            'provider' => [
                'required' => 'Произошла ошибка сервера',
                'exists' => 'Произошла ошибка сервера',
            ],
            'token' => [
                'required' => 'Произошла ошибка сервера'
            ],
            'user_type' => [
                'required' => 'Произошла ошибка сервера',
                'integer' => 'Произошла ошибка сервера',
                'exists' => 'Произошла ошибка сервера',
            ]
        ],
        'order' => [
            'name' => [
                'required' => 'Введите ваше имя',
                'min' => 'Минимальная длина имени :min символов',
            ],
            'phone' => [
                'required' => 'Введите номер телефона',
                'numeric' => 'Номер телефона должен быть целым числом',
                'digits_between' => 'Произошла ошибка сервера'
            ],
            'place_id' => [
                'required' => 'Произошла ошибка сервера',
                'integer' => 'Произошла ошибка сервера',
                'exists' => 'Произошла ошибка сервера'
            ],
            'delivery' => [
                'required' => 'Произошла ошибка сервера',
                'boolean' => 'Произошла ошибка сервера'
            ],
            'date' => [
                'required_if' => 'Произошла ошибка сервера'
            ],
            'time' => [
                'required_if' => 'Произошла ошибка сервера'
            ],
            'persons' => [
                'required_if' => 'Произошла ошибка сервера',
                'max' => 'Количество персон должно быть не больше :max'
            ],
            'smokers' => [
                'boolean' => 'Произошла ошибка сервера'
            ],
            'comment' => [
                'max' => 'Длина комментария должна быть не более :max символов'
            ],
            'address' => [
                'required_if' => 'Введите адресс доставки',
                'max' => 'Длина адресса доставки должна быть не более :max символов'
            ],
        ],
        'update_info' => [
            'first_name' => [
                'required' => 'Введите ваше имя',
                'min' => 'Длина имени должна быть не менее :min символов'
            ],
            'last_name' => [
                'required' => 'Введите вашу фамилию',
                'min' => 'Длина фамилии должна быть не менее :min символов'
            ],
            'email' => [
                'required' => 'Введите Email адрес',
                'email' => 'Введите корректный Email',
                'unique' => 'Пользователь с таким Email уже зарегистрирован в системе',
            ],
            'phone' => [
                'required' => 'Введите ваш номер телефона',
                'integer' => 'Номер телефона должен быть целым числом',
                'unique' => 'Пользователь с таким номером телефона уже зарегистрирован в системе',
            ]

        ],
        'user_data' => [
            'first_name' => [
                'required' => 'Введите имя',
                'min' => 'Длина имени должна быть не менее :min символов'
            ],
            'last_name' => [
                'required' => 'Введите фамилию',
                'min' => 'Длина фамилии должна быть не менее :min символов'
            ],
            'email' => [
                'required' => 'Введите Email адрес',
                'email' => 'Введите корректный Email',
                'unique' => 'Пользователь с таким Email уже зарегистрирован в системе',
            ],
            'phone' => [
                'required' => 'Введите номер телефона',
                'integer' => 'Номер телефона должен быть целым числом',
                'unique' => 'Пользователь с таким номером телефона уже зарегистрирован в системе',
            ],
            'active' => [
                'required' => 'Произошла ошибка сервера',
                'boolean' => 'Произошла ошибка сервера',
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
                'required' => 'Введите старый пароль',
                'min' => 'Минимальная длина пароля - :min символов',
            ],
            'new_password' => [
                'required' => 'Введите новый пароль',
                'min' => 'Минимальная длина пароля - :min символов',
            ],
        ],
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
        'place' => [
            'name' =>
                [
                    'required' => 'Введите название ресторана',
                    'min' => 'Длина названия ресторана должна быть не менее :min символов',
                    'max' => 'Длина названия ресторана должна быть не более :max символов',
                ],
            'description' =>
                [
                    'required' => 'Введите описание ресторана',
                    'min' => 'Длина описания ресторана должна быть не менее :min символов',
                ],
            'city_id' =>
                [
                    'required' => 'Виберите город',
                    'integer' => 'Произошла ошибка сервера',
                    'exists' => 'Произошла ошибка сервера',
                ],
            'type_id' =>
                [
                    'required' => 'Виберите тип ресторана',
                    'integer' => 'Произошла ошибка сервера',
                    'exists' => 'Произошла ошибка сервера',
                ],
            'delivery' =>
                [
                    'required' => 'Произошла ошибка сервера',
                    'boolean' => 'Произошла ошибка сервера',
                ],
            'middle_price' =>
                [
                    'required' => 'Введите цену среднего чека',
                    'numeric' => 'Цена среднего чека должна быть числом',
                ],
            'tables_count' =>
                [
                    'required' => 'Введите количество столиков',
                    'integer' => 'Количество столиков должно быть целым числом',
                ],
            'tables_seats' =>
                [
                    'required' => 'Введите количество мест',
                    'integer' => 'Количество мест должно быть целым числом',
                ],
            'zip' =>
                [
                    'required' => 'Введите ZIP код',
                    'min' => 'Длина ZIP кода должна быть не менее :min символов',
                ],
            'address' =>
                [
                    'required' => 'Введите адрес ресторана',
                    'min' => 'Длина адреса должна быть не менее :min символов',
                ],
            'latitude' =>
                [
                    'required' => 'Выберите локацию на карте',
                    'numeric' => 'Произошла ошибка сервера',
                ],
            'longitude' =>
                [
                    'required' => 'Выберите локацию на карте',
                    'numeric' => 'Произошла ошибка сервера',
                ],
            'phone' => [
                'required' => 'Введите контактный номер телефона',
                'integer' => 'Контактный номер телефона должен быть целым числом',
            ]
        ],
        'iban' => [
            'required' => 'Введите номер своего банковского счета',
            'min' => 'Номер банковского счета должен содержать не менее :min символов',
            'max' => 'Номер банковского счета должен содержать не более :max символов',
            'unique' => 'Такой номер банковского счета уже используеться другим пользователем',
        ],
        'kitchens' => [
            'array' => 'Произошла ошибка сервера',
            'min' => 'Выберите кухню',
        ],
        'kitchens.*' =>
            [
                'integer' => 'Произошла ошибка сервера',
                'exists' => 'Произошла ошибка сервера',
            ],
        'pictures' =>
            [
                'array' => 'Произошла ошибка сервера',
                'min' => 'Необходимо добавить хотя бы :min фотографии'
            ],
        'options' =>
            [
                'array' => 'Произошла ошибка сервера',
                'min' => 'Произошла ошибка сервера',
            ],
        'options.*' => [
            'integer' => 'Произошла ошибка сервера',
            'exists' => 'Произошла ошибка сервера',
        ],
        'place_schedule' =>
            [
                'array' => 'Произошла ошибка сервера',
                'size' => 'Произошла ошибка сервера',
                '*.day_id' => [
                    'required' => 'Произошла ошибка сервера',
                    'integer' => 'Произошла ошибка сервера',
                    'exists' => 'Произошла ошибка сервера',
                ],
                '*.open' => [
                    'date_format' => 'Произошла ошибка сервера',
                ],
                '*.close' => [
                    'date_format' => 'Произошла ошибка сервера',
                ],
                '*.active' => [
                    'required' => 'Произошла ошибка сервера',
                    'boolean' => 'Произошла ошибка сервера',
                ],
                'menu_data' => [
                    'place_id' => [
                        'required' => 'Произошла ошибка сервера',
                        'integer' => 'Произошла ошибка сервера',
                    ],
                    'menu' => [
                        'id' => [
                            'required' => 'Произошла ошибка сервера',
                            'integer' => 'Произошла ошибка сервера',
                            'exists' => 'Произошла ошибка сервера',
                        ],

                        'name' => [
                            'required' => 'Заполните название блюда',
                            'min' => 'Название блюда должно иметь не менее :min символов',
                        ],
                        'description' => [
                            'required' => 'Заполните описание блюда',
                            'min' => 'Описание блюда должно иметь не менее :min символов',
                        ],
                        'price' => [
                            'required' => 'Введите цену на блюдо',
                            'numeric' => 'Цена на блюдо должна быть числом',
                            'min' => 'Цена на блюдо должна быть больше 1',
                        ],
                        'menu_category_id' => [
                            'required' => 'Выберите категорию для блюда',
                            'integer' => 'Выберите категорию для блюда',
                            'exists' => 'Произошла ошибка сервера',
                        ],
                    ]
                ],
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
