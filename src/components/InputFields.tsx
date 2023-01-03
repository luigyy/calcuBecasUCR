import React from "react";

interface InputFieldsProps {
  inputFor: string;
  inputValue: number;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  inputFor,
  inputValue,
  inputHandler,
}) => {
  return (
    <div className="  form-control">
      <label className="items-center input-group input-group-vertical input-group-sm">
        <span className="bg-white font-semibold">
          {inputFor}{" "}
          <span
            className={`text-[10px] text-gray-400 italic bg-white ${
              inputFor === "Reubica" ? "hidden" : ""
            }`}
          >
            (por dia)
          </span>
        </span>
        <input
          onChange={(e) => inputHandler(e)}
          value={inputValue}
          type="number"
          placeholder="0.00₡"
          className=" input input-sm input-bordered   w-36"
        />
      </label>
    </div>
  );
};

export default InputFields;
