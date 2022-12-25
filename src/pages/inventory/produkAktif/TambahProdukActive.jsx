import React from "react";
import TambahProduk from "../../../components/screen/inventory/productActive/TambahProduk";
import SidebarComponents from "../../../components/ui/SidebarComponents";
import Header from "../../../components/ui/Header";

const TambahProdukActive = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-[100%] lg:w-[1900px] p-3">
          <Header />
          <TambahProduk />
        </div>
      </div>
    </div>
  );
};

export default TambahProdukActive;
