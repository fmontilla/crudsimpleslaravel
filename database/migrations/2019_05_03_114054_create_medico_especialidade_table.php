<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMedicoEspecialidadeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('especialidade_medico', function (Blueprint $table) {
            $table->increments('id');
            $table->addColumn('integer', 'especialidade_id',['length' => 10])->unsigned()->nullable();
            $table->addColumn('integer', 'medico_id',['length' => 10])->unsigned()->nullable();
            $table->foreign('especialidade_id')->references('id')->on('especialidades')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('medico_id')->references('id')->on('medicos')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('especialidade_medico');
    }
}
