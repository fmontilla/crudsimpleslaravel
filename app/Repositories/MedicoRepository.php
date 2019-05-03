<?php
namespace App\Repositories;

use App\Models\Medico;
use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Support\Arr;

/**
 * Class MedicoRepository
 * @package namespace App\Repositories;
 */
class MedicoRepository extends Repository implements RepositoryInterface
{
    public function search(array $data)
    {
        $query = $this->model->newQuery();

        $search = Arr::get($data,'search');

        if ($search) {
            $query->where('nome','LIKE',"%{$search}%")
                ->orWhere('crm','LIKE',"%{$search}%");
        }

        return $query->get();
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Medico::class;
    }
}
