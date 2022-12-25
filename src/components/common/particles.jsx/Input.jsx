import React from 'react';

const Input = (props) => {
  return (
    <>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-blue-400">
          {props.label}
        </label>
        <input
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
    </>
  );
};

export default Input;
