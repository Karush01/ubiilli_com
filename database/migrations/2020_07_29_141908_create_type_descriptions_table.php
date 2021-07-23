<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTypeDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('type_descriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60);
            $table->integer('type_id');
            $table->integer('language_id');

            $table->foreign('type_id')->references('id')->on('types');
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
        Schema::dropIfExists('type_descriptions');
    }
}
