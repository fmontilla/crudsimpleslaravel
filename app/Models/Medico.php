<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $fillable = [
        'nome','crm','telefone'
    ];

    public function especialidades()
    {
        return $this->belongsToMany(Especialidade::class);
    }
}
