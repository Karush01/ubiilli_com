<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlacePicturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('place_pictures', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('picture_id');
            $table->bigInteger('place_id');
            $table->foreign('picture_id')->references('id')->on('pictures');
            $table->foreign('place_id')->references('id')->on('places');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('place_pictures');
    }
}
