<?php

namespace App\Requests;
use Validator;

class UserCreateRequest implements ActionInterface
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
            'email' => 'required|unique:users', 
            'phoneNumber' => 'required', 
            'avatar' => 'required|image'
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
            'email.required' => 'Email is required', 
            'phoneNumber.required' => 'Phone is required', 
            'unique' => 'Email already exists', 
            'image' => 'Avatar must be a photo'
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
