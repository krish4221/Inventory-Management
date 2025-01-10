import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

type Props = {
  
  type: string;
  placeholder?: string;
  label: string;
  name: string;
  defaultValue?: string;
  error?: string;
  isRequired?: boolean; 
  
  
};

const FormInput = ({
  
  name,
  type,
  placeholder,
  label,
  defaultValue,
  
  error,
  isRequired,
}: Props) => {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <Label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
       
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        
        
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
