<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MedicosResource extends JsonResource {

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'crm' => $this->crm,
            'telefone' => $this->telefone,
            '_especialidades' => $this->especialidades,
            'especialidades' => $this->especialidades->map(function($data){return $data->id;})
        ];
    }
}
