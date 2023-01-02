import React from "react";

interface InputFieldsProps {
  inputFor: string;
}

const InputFields: React.FC<InputFieldsProps> = ({ inputFor }) => {
  return (
    <div className="  form-control">
      <label className="input-group input-group-vertical input-group-sm">
        <span className="bg-white font-semibold">{inputFor}</span>
        <input
          type="text"
          placeholder="0.00₡"
          className="input input-sm input-bordered   w-36"
        />
      </label>
    </div>
  );
};

export default InputFields;
