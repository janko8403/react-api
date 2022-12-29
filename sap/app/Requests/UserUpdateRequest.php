<?php

namespace App\Requests;
use Validator;

class UserUpdateRequest implements ActionInterface
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'firstName' => 'required', 
            'lastName' => 'required', 
            'phoneNumber' => 'required', 
            'avatar' => 'nullable'
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'firstName.required' => 'Name is required', 
            'lastName.required' => 'Surname is required', 
            'phoneNumber.required' => 'Phone is required'
        ];
    }

    /**
     * Validator
     *
     * @return array
     */
    public function validate(array $request): bool
    {
       Validator::make($request, $this->rules(), $this->messages())->validate();
       return true;
    }
}
