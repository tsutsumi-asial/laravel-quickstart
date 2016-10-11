<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLabelTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('label_task', function (Blueprint $table) {
            $table->integer('label_id')
                ->unsigned()
                ->nullable();
            $table->foreign('label_id')
                ->references('id')
                ->on('labels')
                ->onDelete('cascade');
            $table->integer('task_id')
                ->unsigned()
                ->nullable();
            $table->foreign('task_id')
                ->references('id')
                ->on('tasks')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('label_task');
    }
}
