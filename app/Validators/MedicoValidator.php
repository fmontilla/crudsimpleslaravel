<?php
namespace App\Validators;

use App\Repositories\MedicoRepository;
use App\Traits\ValidatorTrait;
use Illuminate\Validation\Rule;
use Validator;

class MedicoValidator
{
    use ValidatorTrait;

    public function validate(array &$data, $id = null): bool
    {
        $rules = [
            'nome' => ['required','max:30'],
            'crm' => 'required',
            'telefone' => 'required',
            'especialidades' => ['required','array','min:2',Rule::exists('especialidades','id')]
        ];
        $this->validator = Validator::make($data, $rules);
        return $this->isValid();
    }
}
