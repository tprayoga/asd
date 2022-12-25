import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const CetakSP = () => {
  const componentRef = useRef();

  return (
    <div className="container mx-auto mt-16 lg:mt-0">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] lg:text-[30px] mb-3">Surat Pesanan</h1>
        <ReactToPrint
          trigger={() => <button className="p-2 lg:p-[12px] bg-blue-500 mb-3 hidden lg:block  px-4 lg:px-5 font-medium text-sm lg:text-base text-white rounded-xl hover:bg-blue-300">Print</button>}
          content={() => componentRef.current}
        />
        {/* <button className="p-2 lg:p-[12px] bg-blue-500 mb-3 hidden lg:block  px-4 lg:px-5 font-medium text-sm lg:text-base text-white rounded-xl hover:bg-blue-300">Print</button> */}
        <button className="p-2 lg:p-[12px] bg-blue-500 mb-3 block lg:hidden px-4 lg:px-5 font-medium text-sm lg:text-base text-white rounded-xl hover:bg-blue-300">Download</button>
      </div>

      <div className="p-5 border text-xs">
        <div className="p-5" ref={componentRef}>
          <h2 className="font-bold text-[10px] lg:text-[20px]">Apotek Sehat Jaya</h2>
          <p>Jalan jendral sudirman no. 99, Kota Bekasi. Jawa Barat, 17143</p>
          <p>Telp : (021) 123456789</p>

          {/* body surat */}
          <div className="mt-2 text-xs">
            <p className="text-center font-medium text-[15px] lg:text-[20px]">Surat Pesanan</p>
            <p className="text-center mt-1">No SR : SP01/PBF/Kalbe/10082022</p>
            <hr />
          </div>

          {/* Isi surat */}
          <div className="flex flex-col mt-3 gap-1 text-xs">
            <p className="my-2">Yang bertanda tangan dibawah ini</p>
            <div className="flex flex-row gap-3">
              <p className="font-semibold">Nama</p>
              <p className="ml-4">:</p>
              <p>Aldi Kamaludin</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="font-semibold">Jabatan</p>
              <p>:</p>
              <p>Apoteker</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="font-semibold">No SIPA</p>
              <p>:</p>
              <p>442.28/1174-DPMMPSTP/OL/2022</p>
            </div>
          </div>

          <div className="px-0 lg:px-5 text-xs">
            <div className="flex flex-col gap-2">
              <p className="mt-4">Mengajukan Retur produk expired kepada </p>
              <div className="flex flex-row gap-3 mt-3">
                <p className="font-semibold">Nama Industri Farmasi / Pbf</p>
                <p className="ml-[10px]">:</p>
                <p>PT Kalbe Farma Tbk</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="font-semibold">Alamat</p>
                <p>:</p>
                <p>itan Center 3rd Floor Jalan Boulevard Bintaro Block B7/B1 No. 05, Bintaro Jaya Sector 7, Pd. Jaya, Kec. Pd. Aren, Kota Tangerang, Banten 15224</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="font-semibold">No telp</p>
                <p className="ml-[5px]">:</p>
                <p>02156952205</p>
              </div>
            </div>

            {/* table surat */}
            <div className="overflow-x-auto p-4">
              <table className="table w-full">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>

                  <tr className="active">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>

                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* penutup */}
            <div className="flex flex-col gap-1">
              <p className="">Pesanan obat tersebut akan digunakan untuk memenuhi kebutuhan</p>
              <div className="flex flex-row gap-3 mt-2">
                <p className="font-semibold">Nama</p>
                <p className="ml-[10px]">:</p>
                <p>Aldi Kamaludin</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="font-semibold">Alamat</p>
                <p>:</p>
                <p>Jalan jendral sudirman no. 99, Kota Bekasi. Jawa Barat, 17143. Telp : (021) 123456789</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="font-semibold">No SIA</p>
                <p className="ml-[5px]">:</p>
                <p>442.28/1174-DPMMPSTP/OL/2022</p>
              </div>
            </div>

            {/* tanda tangan */}
            <div className="flex mt-5 flex-col justify-end text-center px-5 items-end">
              <div className="p-4">
                <p>Jakarta, 29 Agustus 2022</p>
                <p>Diserahkan Oleh: </p>
              </div>
              <div className="mt-5">
                <p>Aldi Kamaludin</p>
                <p>442.28/1174-DPMMPSTP/OL/2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakSP;
