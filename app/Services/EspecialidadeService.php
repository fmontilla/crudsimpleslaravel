<?php
namespace App\Services;

use App\Repositories\EspecialidadeRepository;

class EspecialidadeService
{
    private $validator;
    private $repository;

    public function __construct(EspecialidadeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search(array $data)
    {
        return $this->repository->search($data);
    }
}
