<?php

namespace App\Requests;

interface ActionInterface
{
    public function rules();
    
    public function messages();

    public function validate(array $request): bool;
}
