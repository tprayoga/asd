import React from "react";
import Breadcumbs from "../../../common/particles.jsx/Breadcumbs";
import Header from "../../../ui/Header";
import SidebarComponents from "../../../ui/SidebarComponents";
import { BsUpload } from "react-icons/bs";

const ImportProduct = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-0 lg:w-[310px] h-screen sticky top-0 z-30">
          <SidebarComponents />
        </div>
        <div className="w-full lg:w-[1900px] p-3">
          <Header />
          <h1 className="font-semibold  text-[20px] lg:text-[30px] mb-1">Import Product</h1>
          <Breadcumbs nama1="Inventory" nama2="Produk Aktif" slice1="/" className="hidden lg:block" slice2="/" nama3="Import Product" />

          <div className="mt-5 flex justify-center flex-col py-0 lg:py-4 lg:px-20">
            <h1 className="text-center font-medium text-2xl">Input/Update Product</h1>
            <ul className="list-decimal px-7 mt-4 text-lg">
              <li>
                Untuk menginput data baru, harap menggunakan template CSV yang telah di sediakan.
                <span className="text-blue-500 cursor-pointer"> Download template CSV</span>
              </li>
              <li className="mt-3">
                Fitur update existing data produk hanya mendukung perubahan harga / indikasi / kegunaan / kegunaan / komposisi / Dosis / Cara Pemakaian / Kontraindikasi dan jangan digunakan Oleh, efek samping, Cara penyampaian , Nomor
                Principal, Nomor Izin Edar (NIE), HNA, Harga Jual Platform produk aktif. Mohon tidak mengganti ID Produk.
                <span className="text-blue-500 cursor-pointer"> Download Data Produk.CSV</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-5 my-5">
            <div className="flex items-center ">
              <label htmlFor="dropzone-file1" className="cursor-pointer flex flex-col items-center justify-center h-64 border-2 rounded-xl">
                <div className="flex flex-col items-center justify-center p-5">
                  <BsUpload className="text-[90px] text-blue-500" />
                  <p className="font-medium text-l text-blue-400 mt-3">Input New Data Here</p>
                  <p className="text-center">
                    Saya sudah memiliki berkas <br /> CSV dengan data produk yang siap diunggah
                  </p>
                </div>
                <input id="dropzone-file1" type="file" hidden accept=".csv" />
              </label>
            </div>
            <div className="flex items-center">
              <label htmlFor="dropzone-file2" className="cursor-pointer flex flex-col items-center justify-center h-64 border-2 rounded-xl">
                <div className="flex flex-col items-center justify-center p-5">
                  <BsUpload className="text-[90px] text-blue-500" />
                  <p className="font-medium text-l text-blue-400 mt-3">Update Existing Data</p>
                  <p className="text-center">
                    Saya sudah memiliki berkas <br /> CSV dengan data produk yang siap diunggah
                  </p>
                </div>
                <input id="dropzone-file2" type="file" hidden accept=".csv" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportProduct;
