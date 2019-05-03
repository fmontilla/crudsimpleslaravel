<?php
namespace App\Traits;

use Illuminate\Support\MessageBag;

trait ValidatorTrait
{
    private $validator;
    private $errors = [];

    public function addError($arg0, $arg1 = null)
    {
        if ($arg1 === null) {
            $arg1 = $arg0;
            $arg0 = 'message';
        }

        if (array_key_exists($arg0, $this->errors) === false) {
            $this->errors[$arg0] = [];
        }

        if (in_array($arg1, $this->errors[$arg0]) === false) {
            $this->errors[$arg0][] = trans($arg1);
        }

        return $this;
    }

    public function addErrors($arg0, $arg1 = null)
    {
        $category = null;
        $errors = null;

        if(gettype($arg0) == 'string')      $category = $arg0;
        if(gettype($arg0) == 'array')       $errors = $arg0;
        if($arg0 instanceof MessageBag)     $errors = $arg0->toArray();
        if(gettype($arg1) == 'array')       $errors = $arg1;
        if($arg1 instanceof MessageBag)     $errors = $arg1->toArray();

        if (is_array($errors) and !empty($errors)) {
            foreach ($errors as $_category => $_errors) {
                foreach ($_errors as $error) {
                    $this->addError(($category ? $category . '.' : '') . $_category, $error);
                }
            }
        }

        return $this;
    }

    public function getErrors()
    {
        if (isset($this->validator)) {
            $this->addErrors($this->validator->errors());
        }

        return $this->errors;
    }

    public function hasError()
    {
        return !empty($this->getErrors());
    }

    public function isValid(): bool
    {
        return !$this->hasError();
    }

    public function resetErrors()
    {
        $this->errors = [];
        return $this;
    }
}
