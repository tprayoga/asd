import React from "react";

const Counter = ({ changeCounter, increment, decrement, value }) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <button className="px-2 text-[20px] rounded-md shadow-md bg-red-500 text-white" onClick={decrement}>
        -
      </button>
      {/* <span>{count}</span> */}
      <input
        type="number"
        placeholder="0"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            changeCounter(e);
          }
        }}
        onChange={changeCounter}
        className="w-16 h-10 text-center rounded-md shadow-md bg-gray-100 text-black"
        value={value}
      />
      <button className="px-2 text-[20px] rounded-md shadow-md bg-green-500 text-white" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default Counter;
