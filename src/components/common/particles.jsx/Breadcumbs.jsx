import React from 'react';

const Breadcumbs = (props) => {
  return (
    <div className="breadcumbs">
      <ul className=" gap-2 hidden lg:flex">
        <li className="cursor-pointer text-blue-500 hover:underline">{props.nama1}</li>
        <li className="text-blue-500">{props.slice1}</li>
        <li className="cursor-pointer text-blue-500 hover:underline">{props.nama2}</li>
        <li className="text-blue-500">{props.slice2}</li>
        <li className="cursor-pointer text-blue-500 hover:underline">{props.nama3}</li>
        <li className="text-blue-500">{props.slice3}</li>
      </ul>
    </div>
  );
};

export default Breadcumbs;
