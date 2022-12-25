import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Counter from "../../../common/particles.jsx/Counter";
import Breadcumbs from "../../../common/particles.jsx/Breadcumbs";
import { BsImages } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import {
  fetchKategori,
  fetchGolongan,
  fetchPrincipal,
  fetchPlatform,
} from "../../../../utils/FetchData";
import Cookies from "js-cookie";

const EditDetailsProducts = () => {
  const { id } = useParams();

  const token = Cookies.get("accessToken");
  const [platform, setPlatform] = useState([]);
  const [group, setGroup] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const [detail, setDetail] = useState([]);
  const [principle, setPrinciple] = useState([]);
  const [golongan, setGolongan] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState([]);
  const [packing, setPacking] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [platformPrice, setPlatformPrice] = useState([]);

  const [update, setUpdate] = useState({
    product_id: id,
    product_name: "",
    category_id: "",
    composition: "",
    dosage: "",
    usage: "",
    contraindication: "",
    side_effect: "",
    storage_description: "",
    label_id: "",
    principal_id: "",
    // product_inventory_id:
  });

  const handleAddGroup = () => {
    const newAdd = [...group, []];
    setGroup(newAdd);
  };

  const handleGroup = (grouping, index) => {
    const newGroup = [...group];
    newGroup[index] = grouping.target.value;
    setGroup(newGroup);
  };
  console.log(group, "sss");

  const handleDeleteGroup = (index) => {
    const deleteGroup = [...group];
    deleteGroup.splice(index, 1);
    setGroup(deleteGroup);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdate((i) => {
      return { ...i, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = update;
      console.log(body);
      const config = {
        headers: {
          Authrization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product/information`,
        method: "PUT",
        data: body,
      };
      console.log(config);
      const response = await axios(config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
      setPlatformPrice(response.data.detail.platform_price);
      console.log(response.data.detail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailInventory();

    if (kategori[0] === undefined) {
      fetchKategori().then((res) => setKategori(res));
    }

    if (principle[0] === undefined) {
      fetchPrincipal().then((res) => setPrinciple(res));
    }

    if (golongan[0] === undefined) {
      fetchGolongan().then((res) => setGolongan(res));
    }

    if (platform[0] === undefined) {
      fetchPlatform().then((res) => setPlatform(res));
    }
  }, []);

  console.log(platform);
  console.log(platformPrice);
  console.log(group);

  return (
    <div className="container mx-auto w-full mt-16 lg:mt-0">
      <h1 className="font-semibold text-[20px] lg:text-[30px] mb-3">
        Update Information Inventory {id}
      </h1>
      <Breadcumbs
        nama1="Inventory"
        slice1="/"
        nama2="Produk Aktif"
        slice2="/"
        nama3={`Update Information ${id}`}
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-col-1 shadow-md rounded-lg mt-5 p-3">
          <h1 className="font-medium text-[20px] lg:text-[25px]">
            Detail Produk
          </h1>

          <TextField
            id="outlined-basic"
            label="Nomer izin edar"
            key={detail.nie_number}
            defaultValue={detail.nie_number}
            variant="outlined"
            className="mt-3"
          />

          <div className="input-foto">
            <div className="bg-blue-500 p-3 text-white font-medium flex mt-4 items-center gap-3 text-[20px] rounded-t-lg">
              <span>
                <BsImages />
              </span>
              Foto Produk
            </div>
            <div className="flex items-center">
              {images !== null ? (
                <label
                  htmlFor="drop"
                  className="cursor-pointer flex flex-row items-center justify-center w-full h-64 border-2 rounded-b-lg"
                >
                  <div className="relative">
                    <img
                      src={images[0]}
                      alt="foto produk"
                      className=" left-[50%] w-64 rounded-lg shadow-md"
                    />
                  </div>
                  <input
                    id="drop"
                    type="file"
                    hidden
                    accept="accept='image/jpeg,image/png,image/jpg"
                  />
                </label>
              ) : (
                <label
                  htmlFor="dropzone-file1"
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 rounded-b-lg"
                >
                  <div className="flex flex-col items-center justify-center">
                    <RiImageAddLine className="text-[90px] text-blue-500" />
                    <p className="font-medium text-l text-blue-400 mt-3">
                      Upload foto product
                    </p>
                    <p className="text-center">
                      <span className="">Ukuran foto maksimal 1 mb</span>
                    </p>
                  </div>
                  <input
                    id="dropzone-file1"
                    type="file"
                    hidden
                    accept="accept='image/jpeg,image/png,image/jpg"
                  />
                </label>
              )}
            </div>
          </div>
          <TextField
            id="outlined-basic"
            label="Nama Obat"
            name="product_name"
            variant="outlined"
            key={detail.product_name}
            defaultValue={detail.product_name}
            className="mt-3"
            onChange={handleChange}
          />
          <FormControl fullWidth className="mt-3">
            <InputLabel id="demo-simple-select-label">
              Tambah Kategori
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category_id"
              label="Tambah Kategori"
              key={detail.product_category_id}
              defaultValue={detail.product_category_id}
              onChange={handleChange}
            >
              {kategori.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            name="indication"
            key={description.indication}
            defaultValue={description.indication}
            label="Indikasi / Kegunaan"
            variant="outlined"
            className="mt-3"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            name="composition"
            key={description.composition}
            defaultValue={description.composition}
            label="Kandungan / Komposisi"
            variant="outlined"
            className="mt-3"
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-static"
            name="dosage"
            key={description.dosage}
            defaultValue={description.dosage}
            label="Dosis"
            multiline
            rows={3}
            className="mt-3"
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-static"
            name="usage"
            label="Cara Pemakaian"
            multiline
            rows={2}
            key={description.usage}
            defaultValue={description.usage}
            className="mt-3"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            name="containdication"
            label="Kontradiksi / Jangan digunakan oleh"
            key={description.contraindication}
            defaultValue={description.contraindication}
            variant="outlined"
            className="mt-3"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Efek Samping"
            name="side_effect"
            multiline
            rows={3}
            variant="outlined"
            className="mt-3"
            key={description.side_effect}
            defaultValue={description.side_effect}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Cara Penyimpanan"
            name="storage_description"
            variant="outlined"
            className="mt-3"
            key={description.storage_description}
            defaultValue={description.storage_description}
            onChange={handleChange}
          />

          <FormControl fullWidth className="mt-3">
            <InputLabel id="demo-simple-select-label">Golongan Obat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="label_id"
              id="demo-simple-select"
              key={detail.label_product}
              defaultValue={detail.label_product}
              label="Golongan Obat"
              onChange={handleChange}
            >
              {golongan.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Perlu resep"
            variant="filled"
            className="mt-3"
            disabled
            key={description.require_prescription === true ? `Ya` : `Tidak`}
            defaultValue={
              description.require_prescription === true ? `Ya` : `Tidak`
            }
          />
          <FormControl fullWidth className="mt-3">
            <InputLabel id="demo-simple-select-label">Principal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="principal_id"
              id="demo-simple-select"
              key={detail.product_principal_id}
              defaultValue={detail.product_principal_id}
              label="Principal"
              onChange={handleChange}
            >
              {principle.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col">
              <h1 className="mt-4 font-bold text-[10px] lg:text-[20px]">
                Kemasan
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  id="outlined-basic"
                  label="Qty"
                  variant="outlined"
                  className="mt-3"
                  key={packing.total_box}
                  defaultValue={packing.total_box}
                />
                <FormControl fullWidth className="mt-3">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    key={packing.type_box}
                    defaultValue={packing.type_box}
                    onChange={handleChange}
                  >
                    <MenuItem value={packing.type_box}>Box</MenuItem>
                    <MenuItem value={packing.type_strip}>Strip</MenuItem>
                    <MenuItem value={packing.type_unit}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  id="outlined-basic"
                  label="Qty"
                  variant="outlined"
                  className="mt-3"
                  key={packing.total_strip}
                  defaultValue={packing.total_strip}
                />
                <FormControl fullWidth className="mt-3">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    key={packing.type_strip}
                    defaultValue={packing.type_strip}
                    onChange={handleChange}
                  >
                    <MenuItem value={packing.type_box}>Box</MenuItem>
                    <MenuItem value={packing.type_strip}>Strip</MenuItem>
                    <MenuItem value={packing.type_unit}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  id="outlined-basic"
                  label="Qty"
                  variant="outlined"
                  className="mt-3"
                  key={packing.total_unit}
                  defaultValue={packing.total_unit}
                />
                <FormControl fullWidth className="mt-3">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    key={packing.type_unit}
                    defaultValue={packing.type_unit}
                    onChange={handleChange}
                  >
                    <MenuItem value={packing.type_box}>Box</MenuItem>
                    <MenuItem value={packing.type_strip}>Strip</MenuItem>
                    <MenuItem value={packing.type_unit}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <h1 className="mt-4 font-bold text-[10px] lg:text-[20px]">
                Stock
              </h1>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Counter count={count} />
                <FormControl fullWidth className="mt-3">
                  <InputLabel id="demo-simple-select-label">
                    Principal
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={``}
                    label="Principal"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Box</MenuItem>
                    <MenuItem value={20}>Strip</MenuItem>
                    <MenuItem value={30}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p className="mt-2">
                <span className="bg-red-500 rounded-full text-white px-[10px] text-sm py-[3px] font-bold">
                  i
                </span>{" "}
                Stock akhir 100 tablet
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-4">
            <div className="relative">
              <p className="text-xs bg-white absolute bottom-[-10px] left-2 z-10 p-[2px]">
                Tanggal Expired
              </p>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border-2 border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 justify-between mt-4 items-center">
            <p className="font-bold">HNA</p>
            <TextField
              id="outlined-basic"
              label="HNA"
              variant="outlined"
              className="w-full"
              key={detail.hna}
              defaultValue={detail.hna}
            />
          </div>
          <div className="grid grid-cols-2 justify-between mt-4 items-center">
            <p className="font-bold">Harga Jual</p>
            <TextField
              id="outlined-basic"
              label="Efek Samping"
              variant="outlined"
              className="w-full"
              key={detail.price}
              defaultValue={detail.price}
            />
          </div>

          <div>
            <p
              className="text-blue-500 hover:underline hover:text-blue-500 cursor-pointer mt-4"
              onClick={() => handleAddGroup()}
            >
              +Tambah Platform lain
            </p>
            {group.map((aa, idx) => {
              return (
                <div className="grid grid-cols-2 gap-4 items-center mt-3">
                  {platformPrice.map((datas, index) => {
                    return (
                      <>
                        <FormControl fullWidth className="">
                          <InputLabel id="demo-simple-select-label_plat">
                            Platform
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label_plat"
                            id="demo-simple-select"
                            key={
                              datas.platform_id === 0
                                ? datas.platform_id + 1
                                : null
                            }
                            defaultValue={
                              datas.platform_id === 0
                                ? datas.platform_id + 1
                                : null
                            }
                            label="Principal"
                          >
                            {platform.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        <div>
                          <TextField
                            id="outlined-basic"
                            label="Harga"
                            variant="outlined"
                            className="w-full"
                            key={datas.price}
                            defaultValue={datas.price}
                            value={aa}
                            onChange={(e) => handleGroup(e, idx)}
                          />
                          <div
                            className="relative"
                            onClick={() => handleDeleteGroup(idx)}
                          >
                            <BsFillTrashFill className="absolute -top-[38px] right-4 text-red-400 text-xl hover:text-gray-500 cursor-pointer" />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 mt-10 gap-12">
            <button className="bg-red-700 text-white font-semibold p-3 rounded-lg">
              Batal
            </button>
            <button
              className="bg-orange-400 text-white font-semibold p-3 rounded-lg"
              type="submit"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDetailsProducts;
