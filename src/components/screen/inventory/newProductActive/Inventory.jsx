import React from "react";
import { useState } from "react";
import Breadcumbs from "../../../common/particles.jsx/Breadcumbs";
import ProductActive from "../productActive/ProductActive";
import CreatePurchase from "../productHabis/CreatePurchase";
import ProductHabis from "../productHabis/ProductHabis";

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [purchase, setPurchase] = useState();
  const [selected, setSelected] = useState([]);
  const isSelected = (name) => {
    return selected.indexOf(name) !== -1;
  };
  const pageDisplay = () => {
    if (page === 1) {
      return <ProductActive />;
    } else if (page === 2) {
      return <ProductHabis setPage={setPage} setPurchase={setPurchase} selected={selected} setSelected={setSelected} isSelected={isSelected} />;
    } else if (page === 3) {
      return <>hold</>;
    } else if (page === 4) {
      return <>expired</>;
    } else if (page === 5) {
      return <>tidak aktif</>;
    } else if (page === 6) {
      return <>import product</>;
    } else if (page === 7) {
      return <CreatePurchase purchase={purchase} setPurchase={setPurchase} selected={selected} setSelected={setSelected} isSelected={isSelected} />;
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <button className="p-2 lg:p-[12px] bg-blue-500 mb-3 px-4 lg:px-5 font-medium text-sm lg:text-base text-white rounded-xl hover:bg-blue-300">Import Product</button>
      </div>
      <Breadcumbs nama1="Inventory" nama2="Produk aktif" slice1="/" className="hidden lg:block" />
      <div className="w-full justify-between border-2 mt-3 text-sm lg:text-base grid text-center grid-cols-5 divide-x">
        <button
          onClick={() => {
            setPage(1);
          }}
          className={page === 1 ? "py-2 bg-blue-500 text-white" : "py-2"}
        >
          Produk Aktif
        </button>
        <button
          onClick={() => {
            setPage(2);
          }}
          className={page === 2 ? "py-2 bg-blue-500 text-white" : "py-2"}
        >
          Habis
        </button>
        <button
          onClick={() => {
            setPage(3);
          }}
          className={page === 3 ? "py-2 bg-blue-500 text-white" : "py-2"}
        >
          Hold
        </button>
        <button
          onClick={() => {
            setPage(4);
          }}
          className={page === 4 ? "py-2 bg-blue-500 text-white" : "py-2"}
        >
          Expired
        </button>
        <button
          onClick={() => {
            setPage(5);
          }}
          className={page === 5 ? "py-2 bg-blue-500 text-white" : "py-2"}
        >
          Tidak Aktif
        </button>
      </div>
      <div>{pageDisplay()}</div>
    </div>
  );
};

export default Inventory;
