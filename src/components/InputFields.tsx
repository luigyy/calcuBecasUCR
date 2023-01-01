import React from "react";

interface InputFieldsProps {}

const InputFields: React.FC<InputFieldsProps> = ({}) => {
  return (
    <div className="form-control w-32">
      <label className="input-group input-group-vertical">
        <span className="btn btn-secondary ">Alimentación</span>
        <input
          type="text"
          placeholder="info@site.com"
          className="input input-bordered"
        />
      </label>
    </div>
  );
};

export default InputFields;
