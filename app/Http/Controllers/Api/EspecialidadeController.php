<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\EspecialidadeService;
use Illuminate\Http\Request;

class EspecialidadeController extends Controller
{
    private $service;

    public function __construct(EspecialidadeService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request)
    {
        return response()->json($this->service->search($request->all()));
    }
}
