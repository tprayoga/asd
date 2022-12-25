import React from "react";
import Header from "../../../components/ui/Header";
import SidebarComponents from "../../../components/ui/SidebarComponents";
import CreatePurchaseComponents from "../../../components/screen/inventory/productHabis/CreatePurchase";

const CreatePurchase = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-[100%] lg:w-[1900px] p-3">
          <Header />
          <CreatePurchaseComponents />
        </div>
      </div>
    </div>
  );
};

export default CreatePurchase;
