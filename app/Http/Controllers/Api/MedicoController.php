<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Enums\HttpStatus;
use App\Http\Resources\MedicosResource;
use App\Services\MedicoService;
use Illuminate\Http\Request;

class MedicoController extends Controller
{
    private $service;

    public function __construct(MedicoService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request)
    {
        return response()->json(MedicosResource::collection($this->service->search($request->all())));
    }

    public function post(Request $request)
    {
        return response()->json($this->service->save($request->all()), HttpStatus::CREATED);
    }

    public function put(Request $request, $id)
    {
        return response()->json($this->service->save($request->all(), $id));
    }

    public function delete(int $id)
    {
        $this->service->delete($id);
        return response()->json(null);
    }
}
