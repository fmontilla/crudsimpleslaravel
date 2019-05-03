<?php

use Illuminate\Database\Seeder;

class EspecialidadesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            array('nome' => 'ALERGOLOGIA'),
            array('nome' => 'ANGIOLOGIA'),
            array('nome' => 'BUCO MAXILO'),
            array('nome' => 'CARDIOLOGIA CLÍNICA'),
            array('nome' => 'CARDIOLOGIA INFANTIL'),
            array('nome' => 'CIRURGIA CABEÇA E PESCOÇO'),
            array('nome' => 'CIRURGIA CARDÍACA'),
            array('nome' => 'CIRURGIA DE CABEÇA/PESCOÇO'),
            array('nome' => 'CIRURGIA DE TÓRAX'),
            array('nome' => 'CIRURGIA GERAL'),
            array('nome' => 'CIRURGIA PEDIÁTRICA'),
            array('nome' => 'CIRURGIA PLÁSTICA'),
            array('nome' => 'CIRURGIA TORÁCICA'),
            array('nome' => 'CIRURGIA VASCULAR'),
            array('nome' => 'CLÍNICA MÉDICA'),
        );

        \App\Models\Especialidade::insert($data);
    }
}
