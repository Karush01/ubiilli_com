<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDishesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 300);
            $table->string('description', 1200);
            $table->float('price');
            $table->integer('weight')->nullable();
            $table->integer('menu_category_id');
            $table->integer('place_id');
            $table->foreign('place_id')->references('id')->on('places');
            $table->foreign('menu_category_id')->references('id')->on('menu_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dishes');
    }
}
