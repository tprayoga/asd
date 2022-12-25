import React, { useState } from "react";
import Breadcumbs from "../../../common/particles.jsx/Breadcumbs";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { BsImages } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import Counter from "../../../common/particles.jsx/Counter";
import DatePicker from "react-datepicker";

const TambahProduk = () => {


  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());


  return (
    <div className="container mx-auto w-full mt-16 lg:mt-0">
      <h1 className="font-semibold text-[20px] lg:text-[30px] mb-3">Tambah Produk</h1>
      <Breadcumbs nama1="Inventory" slice1="/" nama2="Produk Aktif" slice2="/" nama3={`Tambah Produk`} />

      <form>
        <div className="grid grid-col-1 shadow-md rounded-lg mt-5 p-3">
          <h1 className="font-medium text-[20px] lg:text-[25px]">Tambah Produk</h1>

          <TextField id="outlined-basic" label="Nomer izin edar" variant="outlined" className="mt-3" />

          <div className="input-foto">
            <div className="bg-blue-500 p-3 text-white font-medium flex mt-4 items-center gap-3 text-[20px] rounded-t-lg">
              <span>
                <BsImages />
              </span>
              Foto Produk
            </div>
            <div className="flex items-center">
              <label htmlFor="dropzone-file1" className="cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 rounded-b-lg">
                <div className="flex flex-col items-center justify-center">
                  <RiImageAddLine className="text-[90px] text-blue-500" />
                  <p className="font-medium text-l text-blue-400 mt-3">Upload foto product</p>
                  <p className="text-center">
                    <span className="">Ukuran foto maksimal 1 mb</span>
                  </p>
                </div>
                <input id="dropzone-file1" type="file" hidden accept="accept='image/jpeg,image/png,image/jpg" />
              </label>
            </div>
          </div>
          <TextField
            id="outlined-basic"
            label="Nama Obat"
            name="product_name"
            variant="outlined"
        
            className="mt-3"
     
          />
          <FormControl fullWidth className="mt-3">
            <InputLabel id="demo-simple-select-label">Tambah Kategori</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category_id"
              label="Tambah Kategori"
          
            >
                  <MenuItem >
                asadasd
                  </MenuItem>
         
    
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            name="indication"
     
            label="Indikasi / Kegunaan"
            variant="outlined"
            className="mt-3"
     
          />
          <TextField
            id="outlined-basic"
            name="composition"

            label="Kandungan / Komposisi"
            variant="outlined"
            className="mt-3"
     
          />
          <TextField
            id="outlined-multiline-static"
            name="dosage"
     
            label="Dosis"
            multiline
            rows={3}
            className="mt-3"
      
          />
          <TextField
            id="outlined-multiline-static"
            name="usage"
            label="Cara Pemakaian"
            multiline
            rows={2}
     
            className="mt-3"
     
          />
          <TextField
            id="outlined-basic"
            name="containdication"
            label="Kontradiksi / Jangan digunakan oleh"
      
            variant="outlined"
            className="mt-3"
       
          />
          <TextField
            id="outlined-basic"
            label="Efek Samping"
            name="side_effect"
            multiline
            rows={3}
            variant="outlined"
            className="mt-3"
    
          />
          <TextField
            id="outlined-basic"
            label="Cara Penyimpanan"
            name="storage_description"
            variant="outlined"
            className="mt-3"
   
          />

          <FormControl fullWidth className="mt-3">
            <InputLabel id="demo-simple-select-label">Golongan Obat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="label_id"
              id="demo-simple-select"
   
              label="Golongan Obat"
      
            >
      
      
                  <MenuItem>
      sdfsdfdsf
                  </MenuItem>
         
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Perlu resep"
            variant="filled"
            className="mt-3"
            disabled
    
          />
          <FormControl fullWidth className="mt-3">
            <InputLabel id="demo-simple-select-label">Principal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="principal_id"
              id="demo-simple-select"
        
              label="Principal"

            >
  
      
                  <MenuItem>
            bnmbnmbnm
                  </MenuItem>
      
            </Select>
          </FormControl>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col">
              <h1 className="mt-4 font-bold text-[10px] lg:text-[20px]">Kemasan</h1>
              <div className="grid grid-cols-2 gap-4">
                <TextField id="outlined-basic" label="Qty" variant="outlined" className="mt-3" />
                <FormControl fullWidth className="mt-3">
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" >
                    <MenuItem >Box</MenuItem>
                    <MenuItem >Strip</MenuItem>
                    <MenuItem >Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField id="outlined-basic" label="Qty" variant="outlined" className="mt-3"  />
                <FormControl fullWidth className="mt-3">
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" >
                    <MenuItem >Box</MenuItem>
                    <MenuItem >Strip</MenuItem>
                    <MenuItem >Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField id="outlined-basic" label="Qty" variant="outlined" className="mt-3" />
                <FormControl fullWidth className="mt-3">
                  <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem>Box</MenuItem>
                    <MenuItem >Strip</MenuItem>
                    <MenuItem>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <h1 className="mt-4 font-bold text-[10px] lg:text-[20px]">Stock</h1>
              <div className="grid grid-cols-2 gap-4 items-center">
                <Counter count={count} />
                <FormControl fullWidth className="mt-3">
                  <InputLabel id="demo-simple-select-label">Principal</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={``} label="Principal" >
                    <MenuItem value={10}>Box</MenuItem>
                    <MenuItem value={20}>Strip</MenuItem>
                    <MenuItem value={30}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p className="mt-2">
                <span className="bg-red-500 rounded-full text-white px-[10px] text-sm py-[3px] font-bold">i</span> Stock akhir 100 tablet
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-4">
            <div className="relative">
              <p className="text-xs bg-white absolute bottom-[-10px] left-2 z-10 p-[2px]">Tanggal Expired</p>
            </div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border-2 border-gray-300 rounded-md p-2 w-full" />
          </div>

          <div className="grid grid-cols-2 justify-between mt-4 items-center">
            <p className="font-bold">HNA</p>
            <TextField id="outlined-basic" label="HNA" variant="outlined" className="w-full" />
          </div>
          <div className="grid grid-cols-2 justify-between mt-4 items-center">
            <p className="font-bold">Harga Jual</p>
            <TextField id="outlined-basic" label="Efek Samping" variant="outlined" className="w-full"  />
          </div>

          <div>
            <p className="text-blue-500 hover:underline hover:text-blue-500 cursor-pointer mt-4" >
              +Tambah Platform lain
            </p>
      
         
                <div className="grid grid-cols-2 gap-4 items-center mt-3">
               
                               <>
                        <FormControl fullWidth className="">
                          <InputLabel id="demo-simple-select-label_plat">Platform</InputLabel>
                          <Select
                            labelId="demo-simple-select-label_plat"
                            id="demo-simple-select"
                           
                            label="Principal"
                          >
                   
                     
                                <MenuItem>
                             
                                </MenuItem>
                    
                          </Select>
                        </FormControl>

                        <div>
                          <TextField
                            id="outlined-basic"
                            label="Harga"
                            variant="outlined"
                            className="w-full"
                         
                      
                       
                          />
                          <div className="relative">
                            <BsFillTrashFill className="absolute -top-[38px] right-4 text-red-400 text-xl hover:text-gray-500 cursor-pointer" />
                          </div>
                        </div>
                      </>
             
             
                </div>
          
          </div>

          <div className="grid grid-cols-2 mt-10 gap-12">
            <button className="bg-red-700 text-white font-semibold p-3 rounded-lg">Batal</button>
            <button className="bg-orange-400 text-white font-semibold p-3 rounded-lg" type="submit">
              Konfirmasi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahProduk;
