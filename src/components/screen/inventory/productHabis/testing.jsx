import React, { useState } from 'react';
import Breadcumbs from '../../../common/particles.jsx/Breadcumbs';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { BsImages } from 'react-icons/bs';
import { RiImageAddLine } from 'react-icons/ri';
import { BsFillTrashFill, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import Counter from '../../../common/particles.jsx/Counter';
import DatePicker from 'react-datepicker';
import Delivery from '../../../../assets/icons/delivery.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const CreatePurchase = () => {
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  // const [principal, setPricipal] = useState([]);
  const [selected, setSelected] = useState([]);

  const location = useLocation();
  const dataku = location.state.dataku;
  const token = Cookies.get('accessToken');

  // const groupedData = Object.values(dataku.reduce((a, { principal_id, ...r }) => ({ ...a, [principal_id]: { ...(a[principal_id] || { principal_id }), ...r } }), {}));
  // console.log(groupedData);

  const inventories = [
    { name: 'asparagus', type: 'vegetables', quantity: 9 },
    { name: 'bananas', type: 'fruit', quantity: 5 },
    { name: 'goat', type: 'meat', quantity: 23 },
    { name: 'cherries', type: 'fruit', quantity: 12 },
    { name: 'fish', type: 'meat', quantity: 22 },
  ];

  const groupedInventories = dataku.reduce((groups, item) => {
    const { principal_name } = item;

    if (!groups[principal_name]) {
      groups[principal_name] = [];
    }

    groups[principal_name].push(item);

    return groups;
  }, {});

  // console.log(JSON.stringify(groupedInventories, null, 2));
  console.log(groupedInventories);

  // const groupByCategory = products.reduce((group, product) => {
  //   let { category } = product;
  //   group[category] = group[category] ?? [];
  //   group[category].push(product);
  //   return product;
  // }, {});

  // console.log("goblok", JSON.stringify(groupByCategory, null, 2));

  // function groupBy(list, keyGetter) {
  //   const map = new Map();
  //   list.forEach((item) => {
  //     const key = keyGetter(item);
  //     const collection = map.get(key);
  //     if (!collection) {
  //       map.set(key, [item]);
  //     } else {
  //       collection.push(item);
  //     }
  //   });
  //   return map;
  // }
  // const grouped = groupBy(dataku, (product) => product.principal_id);
  // console.log(grouped.get(1));
  // console.log(grouped.get(2));

  //  ============== handle checkbox ================= //

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((e) => e !== value));
    }
  };

  // console.log(selected);

  const getPrincipal = dataku.map((i) => i.principal_id);
  // console.log("PRINCIPAL ID", getPrincipal);

  const fetchDetailSP = async () => {};

  return (
    <div className="container mx-auto  mt-16 lg:mt-0">
      <h1 className="font-semibold text-[20px] lg:text-[30px] mb-3">Create Purchase</h1>
      <Breadcumbs nama1="Inventory" slice1="/" nama2="Produk Habis" slice2="/" nama3={`Create Purchase`} />

      <div className="overflow-auto flex flex-row gap-3 items-center p-3 shadow-md rounded-xl mt-5 border">
        <img src={Delivery} alt="" />
        <div className="flex flex-col">
          <h1 className="font-bold">Informasi Pengiriman</h1>
          <p>Apotek Sehat Jaya | 08171274772</p>
          <p>
            Cakung, Kota Admnistrasi Jakarta Timur <br /> DKI Jakarta 13950
          </p>
          <div className="flex flex-row shadow-md p-3 rounded-xl items-center gap-3 border mt-3">
            <BsFillFileEarmarkTextFill className="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sed?</p>
          </div>
        </div>
      </div>

      <div className="mt-5 ">
        <h1 className="text-center font-bold text-[20px]">List Cart</h1>
        <div className="flex flex-row justify-between mt-5">
          <p className="font-semibold">Principle : MPI</p>
          <p className="text-blue-500 hover:underline">+ Tambah Produk</p>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="font-semibold">
              <TableCell align="center"></TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">Tipe</TableCell>
              <TableCell align="center">Kuantitas</TableCell>
              <TableCell align="center">Harga</TableCell>
              <TableCell align="center">Hapus Barang</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataku.map((row, index) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <p>{row.principal_name}</p>
                  <TableCell component="th" scope="row" align="center">
                    <Checkbox value={row.product_id} onChange={handleCheck} />
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.product_name}
                  </TableCell>
                  <TableCell align="center">Reguler</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Rp.{row.sell_price}</TableCell>
                  <TableCell align="center">
                    <p className="font-semibold text-red-400 cursor-pointer hover:underline">Hapus</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-center mt-3 ">
        <button className="p-3 bg-orange-500 text-white rounded-lg shadow-md">Checkout Via Aplikasi</button>
      </div>

      <h1 className="font-semibold mt-5">Principle : Kalbe</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="font-semibold">
              <TableCell align="center"></TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">Tipe</TableCell>
              <TableCell align="center">Kuantitas</TableCell>
              <TableCell align="center">Harga</TableCell>
              <TableCell align="center">Hapus Barang</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataku.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.product_name}
                </TableCell>
                <TableCell align="center">Reguler</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Rp.{row.sell_price}</TableCell>
                <TableCell align="center">
                  <p className="font-semibold text-red-400 cursor-pointer hover:underline">Hapus</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-3 ">
        <button className="p-3 bg-blue-700 text-white rounded-lg shadow-md">Cetak SP</button>
      </div>
    </div>
  );
};

export default CreatePurchase;
