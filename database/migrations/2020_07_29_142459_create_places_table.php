<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 120);
            $table->string('slug', 260)->unique();
            $table->text('description');
            $table->float('middle_price')->nullable();
            $table->integer('type_id');
            $table->integer('picture_id')->nullable();
            $table->integer('city_id');
            $table->integer('user_id');
            $table->integer('tables_count');
            $table->integer('tables_seats');
            $table->string('address');
            $table->string('zip')->nullable();
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();
            $table->bigInteger('phone')->nullable();
            $table->boolean('delivery')->default(false);
            $table->float('rating')->default(0);
            $table->boolean('status')->nullable();
            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('types');
            $table->foreign('picture_id')->references('id')->on('pictures');
            $table->foreign('city_id')->references('id')->on('cities');
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
        Schema::dropIfExists('places');
    }
}
