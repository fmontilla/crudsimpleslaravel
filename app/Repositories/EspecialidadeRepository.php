<?php
namespace App\Repositories;

use App\Models\Especialidade;
use App\Repositories\Contracts\RepositoryInterface;

/**
 * Class EspecialidadeRepository
 * @package namespace App\Repositories;
 */
class EspecialidadeRepository extends Repository implements RepositoryInterface
{
    public function search(array $data)
    {
        $query = $this->model->newQuery();

        return $query->get();
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Especialidade::class;
    }
}
