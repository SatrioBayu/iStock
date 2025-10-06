// components/CustomSelect.jsx
import React from "react";
import Select from "react-select";

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  label,
  labelValue,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {label}
      </label>
      <Select
        name={labelValue}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CustomSelect;
