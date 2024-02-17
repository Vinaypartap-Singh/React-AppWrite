import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <select
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-20- w-full ${className}`}
        {...props}
        id={id}
        ref={ref}
      >
        {options?.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
