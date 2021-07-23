<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKitchenDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kitchen_descriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->integer('kitchen_id');
            $table->integer('language_id');

            $table->foreign('kitchen_id')->references('id')->on('kitchens');
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
        Schema::dropIfExists('kitchen_descriptions');
    }
}
