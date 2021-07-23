<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\WebController;
use Lang;
use Stripe\Stripe;
use Stripe\Account;
use Stripe\Token;
use Stripe\Transfer;


class HomeController extends WebController
{

    public function __construct()
    {

        parent::__construct();

    }

    public function index()
    {

//        Stripe::setApiKey(env('STRIPE_SECRET'));
//
//        $token = Token::create([
//            'bank_account' => [
//                'country' => 'GB',
//                'currency' => 'usd',
//                'account_holder_name' => 'Andrey Petrov',
//                'account_holder_type' => 'individual',
//                'account_number' => '00012345',
//            ],
//        ]);
//
//        $account = Account::create([
//            'country' => 'GB',
//            'type' => 'custom',
//            'business_type' => 'individual',
//            'individual' => [
//                'address' => [
//                    'line1' => 'address_full_match',
//                    'city' => 'address_full_match',
//                    'postal_code' => 'EC1Y1BE'
//                ],
//                'dob' => ['day' => 1, 'month' => 1, 'year' => 1901],
//                'email' => 'andrey.petrov@mail.ru',
//                'first_name' => 'Andrey',
//                'last_name' => 'Petrov',
//                'phone' => "+44951911897"
//            ],
//            'business_profile' => [
//                'mcc' => 5811,
//                'url' => 'https://limgro.com'
//            ],
//            'tos_acceptance' => [
//                'date' => time(),
//                'ip' => $_SERVER['REMOTE_ADDR'],
//            ],
//            'capabilities' => [
//                'card_payments' => [
//                    'requested' => true,
//                ],
//                'transfers' => [
//                    'requested' => true,
//                ],
//            ],
//        ]);
//
//        //походу зв'язує банківський рахунок з аккаунтом
//
//        $link = Account::createExternalAccount($account->id, ['external_account' => $token->id]);
//
//        dd($link);


//        стоврює первід грошей на зв'язаний аккаунт
//        $result = Transfer::create([
//            'amount' => 10000,
//            'currency' => 'usd',
//            'destination' =>  'acct_1I6EGUPaGrZcAflC',
//        ]);
//
//        dd( $result ) ;


        $this->data['meta'] = Lang::get('meta.home');

        return self::view($this->data);

    }
}
