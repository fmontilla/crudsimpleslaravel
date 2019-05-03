<?php

namespace App\Services;

use App\Exceptions\ValidatorException;
use App\Repositories\MedicoRepository;
use App\Validators\MedicoValidator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class MedicoService
{
    /**
     * @var MedicoValidator
     */
    private $validator;

    /**
     * @var MedicoRepository
     */
    private $repository;

    /**
     * PlanoService constructor.
     */
    public function __construct(MedicoValidator $validator, MedicoRepository $repository)
    {
        $this->repository = $repository;
        $this->validator = $validator;
    }

    public function index()
    {
        return $this->repository->all();
    }

    public function search(array $data)
    {
        return $this->repository->search($data);
    }

    public function save(array $data, $id = null)
    {
        if ($id !== null and $this->repository->find($id) === null) {
            throw new ModelNotFoundException('Médico não encontrado!');
        }

        if (!$this->validator->validate($data, $id)) {
            throw new ValidatorException($this->validator->getErrors());
        }

        try {
            \DB::beginTransaction();

            if ($id !== null) {
                $this->repository->update($data, $id);
                $medico = $this->repository->find($id);
                $medico->especialidades()->sync($data['especialidades']);
                \DB::commit();
                return false;
            }

            $medico = $this->repository->create($data);
            $medico->especialidades()->sync($data['especialidades']);
            \DB::commit();

        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }
}
