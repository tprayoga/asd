import React from 'react';
import SidebarComponents from '../../../components/ui/SidebarComponents';
import Header from '../../../components/ui/Header';
import DetailsProducts from '../../../components/screen/inventory/productActive/DetailsProducts';

const DetailsProductActive = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-[100%] lg:w-[1900px] p-3">
          <Header />
          <DetailsProducts />
        </div>
      </div>
    </div>
  );
};

export default DetailsProductActive;
