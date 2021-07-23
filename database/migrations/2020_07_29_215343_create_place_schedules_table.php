<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaceSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('place_schedules', function (Blueprint $table) {
            $table->id();
            $table->time('open')->nullable();
            $table->time('close')->nullable();
            $table->integer('day_id');
            $table->integer('place_id');
            $table->boolean('active')->default(true);

            $table->foreign('day_id')->references('id')->on('days');
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
        Schema::dropIfExists('place_schedules');
    }
}
