import React from "react";
import EditDetailsProducts from "../../../components/screen/inventory/productActive/EditDetailsProducts";
import SidebarComponents from "../../../components/ui/SidebarComponents";
import Header from "../../../components/ui/Header";

const EditDetailsProductActive = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-[100%] lg:w-[1900px] p-3">
          <Header />
          <EditDetailsProducts />
        </div>
      </div>
    </div>
  );
};

export default EditDetailsProductActive;
