import React from "react";
import Header from "../../../components/ui/Header";
import SidebarComponents from "../../../components/ui/SidebarComponents";
import ProductOutOfStock from "../../../components/screen/inventory/productHabis/ProductHabis";

const ProductHabis = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-[100%] lg:w-[1900px] p-3">
          <Header />
          <ProductOutOfStock />
        </div>
      </div>
    </div>
  );
};

export default ProductHabis;
