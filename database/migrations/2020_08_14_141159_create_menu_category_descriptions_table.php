<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuCategoryDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_category_descriptions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->integer('menu_category_id');
            $table->integer('language_id');

            $table->foreign('menu_category_id')->references('id')->on('menu_categories');
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
        Schema::dropIfExists('menu_category_descriptions');
    }
}
