<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name')->default('');
            $table->string('email')->unique();
            $table->bigInteger('phone')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->integer('language_id');
            $table->integer('user_type_id');
            $table->rememberToken();
            $table->timestamps();
            $table->boolean('active')->default(true);

            $table->foreign('language_id')->references('id')->on('languages');
            $table->foreign('user_type_id')->references('id')->on('user_types');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
