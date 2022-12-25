import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const token = Cookies.get("accessToken");

const DetailsProducts = () => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState([]);
  const [packing, setPacking] = useState([]);

  const fetchDetailInventory = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product/detail?id=${id}`,
        method: "GET",
      };
      console.log(config);
      const response = await axios(config);
      setDetail(response.data.detail);
      setImages(response.data.detail.media);
      setDescription(response.data.detail.description);
      setPacking(response.data.detail.packing);
      console.log(response.data.detail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailInventory();
  }, []);

  console.log(description);
  console.log(packing);
  console.log(images);
  return (
    <div className="container mx-auto w-full mt-16 lg:mt-0">
      <h1 className="font-semibold text-[20px] lg:text-[30px]">Detail Inventory {id}</h1>
      <div className="flex flex-row justify-center lg:justify-end mt-10 p-3 gap-3">
        <button className="bg-blue-500 hover:bg-grey-200   py-2 px-4 rounded-lg inline-flex items-center gap-3 font-medium text-white">Ubah Stock & Harga</button>
        <button className="bg-orange-500 hover:bg-grey-200 py-2 px-[28px] rounded-lg inline-flex items-center gap-3 font-medium text-white">
          <Link to={`/inventory/produk-aktif/edit-product-details/${id}`} className="hover:text-white">
            Edit Information
          </Link>
        </button>
      </div>
      <h1 className="bg-blue-500 text-white text-center py-2 font-medium mt-5">Produk Aktif</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap w-full justify-center lg:justify-start mt-10 gap-3">
            <div className="flex flex-col">
              {images === null ? (
                <p>Masukin no image disini</p>
              ) : (
                <>
                  <img src={images[0]} alt="" className="w-[200px] border-2 rounded-lg shadow-md" />
                  <div className="flex flex-row gap-2 mt-2">
                    <img src={images[0]} alt="" className="w-[60px] border-2 rounded-lg" />
                    <img src={images[0]} alt="" className="w-[60px] border-2 rounded-lg" />
                    <img src={images[0]} alt="" className="w-[60px] border-2 rounded-lg" />
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4 items-center lg:items-start p-4">
              <p className="font-bold text-[20px]">{detail.product_name}</p>

              <p className="font-medium">
                Jumlah Produk <span className="bg-gray-300 font-medium p-2 rounded-full">{detail.stock}</span>
              </p>

              <div className="flex flex-row items-center gap-3">
                <p className="font-semibold">Label Produk</p>
                <p className="bg-blue-700 text-white px-3 py-[6px] rounded-xl">Resep</p>
              </div>
            </div>
          </div>
        </div>
        <p className="items-end font-bold text-[30px] p-5">Rp.{detail.price}</p>
      </div>
      <div className="flex flex-col shadow-md mt-3 rounded-lg">
        <div className="flex flex-wrap justify-evenly py-2 rounded-t-lg bg-green-300 font-bold">
          <p>HNA</p>
          <p>Harga Jual</p>
        </div>
        <div className="flex flex-wrap justify-evenly my-3 bg-white font-bold">
          <p>Rp.140000</p>
          <p>Rp.140000</p>
        </div>
      </div>
      <h1 className="bg-green-300 text-black font-semibold py-[10px] text-center mt-4 rounded-t-lg">Harga Jual Platform</h1>
      <div className="flex flex-wrap justify-evenly p-2 rounded-lg font-semibold shadow-md">
        <div className="flex flex-col justify-center">
          <p>Halodoc</p>
          <p>Alodoc</p>
          <p>Tokopedia</p>
        </div>
        <div>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div>
          <p>Rp.300.000</p>
          <p>Rp.300.000</p>
          <p>Rp.300.000</p>
        </div>
      </div>
      <div className="shadow-lg rounded-lg">
        <h1 className="text-[25px] font-medium mt-10 p-3">Deskripsi Produk</h1>
        <hr className="mt-2" />
        <div className="flex flex-col p-3">
          <div className="my-3">
            <p className="font-bold">Indikasi / Kegunaan</p>
            <p>{description.indication}</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Kandungan / Komposisi</p>
            <p>{description.composition}</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Dosis</p>
            <p>{description.dosage}</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Cara Pemakaian</p>
            <p>{description.usage} MISSING STRING</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Kemasan</p>
            <p>{description.storage_description}</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Golongan</p>
            <p>MISSING DB</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Perlu Resep</p>
            <p>MISSING DB</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Kontraindikasi / Jangan digunakan oleh</p>
            <p>{description.contraindication}</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Efek Samping</p>
            <p>{description.side_effect}</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Cara Penyimpanan</p>
            <p>MISSING DB</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Principal</p>
            <p>MISSING DB</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Nomor Izin Edar (NIE)</p>
            <p>MISSING DB</p>
          </div>
          <div className="my-3">
            <p className="font-bold">Expired Date</p>
            <p>MISSING DB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProducts;
