<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->bigInteger('phone');
            $table->integer('persons')->nullable();
            $table->date('date')->nullable();
            $table->time('time')->nullable();
            $table->string('comment', 300)->default('');
            $table->string('address', 300)->default('');
            $table->boolean('delivery')->default(false);
            $table->boolean('smokers')->nullable();
            $table->boolean('paid')->default(false);
            $table->boolean('confirmed')->nullable();
            $table->integer('place_id');
            $table->integer('user_id');
            $table->boolean('closed')->default(false);
            $table->float('amount')->nullable();
            $table->string('stripe_id', 32)->unique()->nullable();
            $table->timestamps();

            $table->foreign('place_id')->references('id')->on('places');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
