<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDayDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('day_descriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->integer('day_id');
            $table->integer('language_id');

            $table->foreign('day_id')->references('id')->on('days');
            $table->foreign('language_id')->references('id')->on('languages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('day_descriptions');
    }
}
