import React, { Fragment, useState } from "react";
import Breadcumbs from "../../../common/particles.jsx/Breadcumbs";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { BsImages } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { BsFillTrashFill, BsFillFileEarmarkTextFill } from "react-icons/bs";
import Counter from "../../../common/particles.jsx/Counter";
import DatePicker from "react-datepicker";
import Delivery from "../../../../assets/icons/delivery.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useParams } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Dialog, Transition } from "@headlessui/react";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import { disable } from "workbox-navigation-preload";
const CreatePurchase = ({ purchase, setPurchase, selected, setSelected, isSelected }) => {
  const [selectedPurchase, setSelectedPurchase] = useState(selected);
  const fetchProdukHabisSeveral = async () => {
    try {
      const body = {
        id: selectedPurchase,
      };

      const config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product/stock/several`,
        method: "POST",
        data: body,
      };

      const response = await axios(config);
      setPurchase(response.data.detail);
      setSelected(selectedPurchase);
      console.log("dhsh", response.data.detail);

      // navigate('/inventory/produk-habis/create-purchase', { state: { dataku: several } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (e, item) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setSelectedPurchase([...selectedPurchase, item.product_id]);
    } else if (e.target.checked === false) {
      setSelectedPurchase(selectedPurchase.filter((id) => id !== item.product_id));
    }

    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    // }
    // setSelected(newSelected);
  };

  const [items, setItems] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();

  function closeModal() {
    fetchProdukHabisSeveral();
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    fetchData();
  }
  const handleDeleteId = async (id) => {
    const newResp = resp
      .filter((del) => del.product_id !== id)
      .map((filterDel) => {
        return {
          ...filterDel,
          options: filterDel.options.filter((del) => del.product_id !== id),
        };
      });
    setResp(newResp);

    var deleted = newResp[0].options.map((e) => e.product_id);
    try {
      const body = {
        id: deleted,
      };

      const config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product/stock/several`,
        method: "POST",
        data: body,
      };

      const response = await axios(config);
      setSelected(deleted);
      setPurchase(response.data.detail);
      console.log("dhsh", response.data.detail);

      // navigate('/inventory/produk-habis/create-purchase', { state: { dataku: several } });
    } catch (error) {
      console.log(error);
    }

    // const newResp = resp.filter((e) => e.options.product_id !== product_id);
    // setResp(newResp);
  };
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  // const [principal, setPricipal] = useState([]);

  const location = useLocation();

  // const token = Cookies.get('accessToken');

  const groupByPrincipal = purchase.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.principal_name]) {
      acc[value.principal_name] = [];
    }

    // principal_name
    acc[value.principal_name].push(value);

    return acc;
  }, {});

  const res = Object.entries(groupByPrincipal).map(([label, options]) => ({
    label,
    options,
  }));
  const [resp, setResp] = useState(res);

  useEffect(() => {
    setResp(res);
  }, [purchase]);

  // console.log(res);

  // Counter function
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const changeCounter = (e) => {
    setCount(parseInt(e.target.value));
  };

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
  const token = Cookies.get("accessToken");
  const limit = 200;
  const changePage = (data) => {
    console.log(data.selected);

    fetchData(data.selected + 1);
  };
  const [totalPage, setTotalPage] = useState("");

  const fetchData = async (currentPage = 1) => {
    try {
      const body = {
        type: null,
        list_id: null,
      };

      const config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product/inventories?limit=${limit}&offset=${currentPage}&status=${3}`,
        method: "POST",
        data: body,
      };

      console.log(config);

      const response = await axios(config);
      setItems(response.data.detail.product_data);
      console.log(
        "data",
        response.data.detail.product_data.filter((item) => item.product_principal_name === id)
      );
      setTotalPage(Math.ceil(response.data.detail.jumlah_product / limit));

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("total", resp);
  return (
    <div className="container mx-auto  mt-16 lg:mt-0">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    {items
                      .filter((item) => item.product_principal_name === id)
                      .map((item, index) => {
                        const isItemSelected = isSelected(item.product_id);
                        return (
                          <>
                            <div>
                              {isItemSelected ? (
                                <div className="mt-3 flex items-center shadow-md bg-red-500 rounded-xl p-3 border-2 justify-between">
                                  <div className="flex items-center ">
                                    <input
                                      key={index}
                                      id={item.product_id}
                                      type="checkbox"
                                      disabled
                                      name={item.product_name}
                                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
                                      onChange={(e) => handleClick(e, item)}
                                      // onChange={(e) => handleClick(e, item.product_id)}
                                    />
                                    <img src={item.media[0]} className="w-20" />
                                    <div className="flex flex-col text-sm lg:text-base gap-1 text-clip overflow-hidden">
                                      <p>{item.product_name}</p>
                                      <p className="font-bold">Rp. {item.sell_price}</p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3 flex items-center shadow-md rounded-xl p-3 border-2 justify-between">
                                  <div className="flex items-center">
                                    <input
                                      key={index}
                                      id={item.product_id}
                                      type="checkbox"
                                      name={item.product_name}
                                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
                                      onChange={(e) => handleClick(e, item)}
                                      // onChange={(e) => handleClick(e, item.product_id)}
                                    />
                                    <img src={item.media[0]} className="w-20" />
                                    <div className="flex flex-col text-sm lg:text-base gap-1 text-clip overflow-hidden">
                                      <p>{item.product_name}</p>
                                      <p className="font-bold">Rp. {item.sell_price}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })}

                    <ReactPaginate
                      previousLabel={`Sebelumnya`}
                      nextLabel={`Selanjutnya`}
                      breakLabel={`...`}
                      pageCount={totalPage}
                      marginPagesDisplayed={3}
                      pageRangeDisplayed={3}
                      onPageChange={changePage}
                      containerClassName={`pagination justify-center mt-5`}
                      pageClassName={`page-item`}
                      pageLinkClassName={`page-link `}
                      previousClassName={`page-item`}
                      previousLinkClassName={`page-link`}
                      nextClassName={`page-item`}
                      nextLinkClassName={`page-link`}
                      activeClassName={`active`}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Add to cart
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
      </div>

      {/* TESTING */}

      {resp.map((row, index) => (
        <>
          <div className="flex flex-row justify-between mt-20 items-center">
            <h1 className="my-3 font-semibold">{row.label}</h1>
            <p
              onClick={() => {
                setId(row.label);
                openModal();
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              + Tambah Produk
            </p>
          </div>
          <TableContainer component={Paper} className="">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="font-semibold">
                  <TableCell align="center">Nama</TableCell>
                  <TableCell align="center">Tipe</TableCell>
                  <TableCell align="center">Kuantitas</TableCell>
                  <TableCell align="center">Harga</TableCell>
                  <TableCell align="center">Hapus Barang</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.options.map((item, index) =>
                  row.options.length === 0 ? null : (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row" align="center">
                        {item.product_name}
                      </TableCell>
                      <TableCell align="center">Reguler</TableCell>
                      <TableCell align="center">
                        <Counter changeCounter={changeCounter} increment={increment} decrement={decrement} value={count} />
                      </TableCell>
                      <TableCell align="center">Rp.{item.sell_price}</TableCell>
                      <TableCell align="center">
                        <p className="font-semibold text-red-400 cursor-pointer hover:underline" onClick={() => handleDeleteId(item.product_id)}>
                          Hapus
                        </p>
                        <p>{item.product_id}</p>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {row.label === "PT. Millenial Pharmacon International, Tbk" ? (
            <div className="flex justify-center mt-3 ">
              <button className="p-3 bg-orange-500 text-white rounded-lg shadow-md">Checkout Via Aplikasi</button>
            </div>
          ) : row.label !== "PT. Millenial Pharmacon International, Tbk" ? (
            <div className="flex justify-center mt-3 ">
              <button className="p-3 bg-blue-700 text-white rounded-lg shadow-md">Cetak SP</button>
            </div>
          ) : null}
        </>
      ))}

      {/* END OF TESTING */}

      {/* <TableContainer component={Paper}>
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
      </TableContainer> */}
    </div>
  );
};

export default CreatePurchase;
