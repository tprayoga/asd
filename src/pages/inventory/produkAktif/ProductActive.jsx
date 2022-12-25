import React from "react";
import HOC from "../../../components/HOC";
import Header from "../../../components/ui/Header";
import SidebarComponents from "../../../components/ui/SidebarComponents";
import ProductActive from "../../../components/screen/inventory/productActive/ProductActive";
import Inventory from "../../../components/screen/inventory/newProductActive/Inventory";
const Test = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-[100%] lg:w-[1900px] p-3">
          <Header />
          <Inventory />
        </div>
      </div>
    </div>
  );
};

export default HOC(Test);
