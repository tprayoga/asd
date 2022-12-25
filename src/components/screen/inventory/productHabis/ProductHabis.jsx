import React, { useState, useEffect } from "react";
import Breadcumbs from "../../../common/particles.jsx/Breadcumbs";
import axios from "axios";
// import Drawer from 'react-bottom-drawer';
import Cookies from "js-cookie";
import Product1 from "../../../../assets/icons/product1.png";
import Modal from "../../../common/particles.jsx/Modal";
import { SlOptionsVertical } from "react-icons/sl";
import { FaFilter } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { BsCartPlusFill } from "react-icons/bs";
import deleteModal from "../../../../assets/images/modaldelete.png";
import nonaktifmodal from "../../../../assets/images/modalnonaktif.png";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { fetchPrincipal, fetchGolongan, fetchKategori } from "../../../../utils/FetchData";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { value } from "dom7";

const ProductHabis = ({ setPage, setPurchase, selected, setSelected, isSelected }) => {
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();
  const [setIsVisible] = useState(false);

  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [totalPage, setTotalPage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [several, setSeveral] = useState([]);
  // ================= handle filtering ================= //

  const [principle, setPrinciple] = useState([]);
  const [principleId, setPrincipleId] = useState([]);

  const [kategori, setKategori] = useState([]);
  const [kategoriId, setKategoriId] = useState([]);

  const [golongan, setGolongan] = useState([]);
  const [golonganId, setGolonganId] = useState([]);

  const [search] = useState("");
  const limit = 5;

  // ============== checkbox =============== //

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = products.map((n) => n.product_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, item) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setSelected([...selected, item.product_id]);
    } else if (e.target.checked === false) {
      setSelected(selected.filter((id) => id !== item.product_id));
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
  console.log(selected);
  // ============= pagination 💥 ================ //

  const changePage = (data) => {
    fetchData(data.selected + 1);
  };

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

      const response = await axios(config);
      setProducts(response.data.detail.product_data);
      setTotalPage(Math.ceil(response.data.detail.jumlah_product / limit));
    } catch (error) {
      console.log(error);
    }
  };

  // ========================= fetch inventory ======================== //

  const fetchFiltering = async () => {
    let params = new URLSearchParams({
      offset: 1,
      limit: 5,
      status: 3,
    }).toString();

    if ((principleId.length === 0) & (kategoriId.length === 0) & (golonganId.length === 0)) {
      fetchData();
    } else if (principleId.length !== 0 && kategoriId.length === 0 && golonganId.length === 0) {
      try {
        const body = {
          type: "principal",
          list_id: principleId,
        };

        const config = {
          headers: {
            Authorization: `Bearer ` + token,
          },
          url: `${process.env.REACT_APP_API_PRODUCT}product/inventories?` + params,
          method: "POST",
          data: body,
        };
        console.log(config);
        const response = await axios(config);
        setProducts(response.data.detail.product_data);
      } catch (error) {
        console.log(error);
      }
    } else if (principleId.length === 0 && kategoriId.length !== 0 && golonganId.length === 0) {
      try {
        const body = {
          type: "category",
          list_id: kategoriId,
        };

        const config = {
          headers: {
            Authorization: `Bearer ` + token,
          },
          url: `${process.env.REACT_APP_API_PRODUCT}product/inventories?` + params,
          method: "POST",
          data: body,
        };
        const response = await axios(config);
        setProducts(response.data.detail.product_data);
      } catch (error) {
        console.log(error);
      }
    } else if (principleId.length === 0 && kategoriId.length === 0 && golonganId.length !== 0) {
      try {
        const body = {
          type: "label",
          list_id: golonganId,
        };

        const config = {
          headers: {
            Authorization: `Bearer ` + token,
          },
          url: `${process.env.REACT_APP_API_PRODUCT}product/inventories?` + params,
          method: "POST",
          data: body,
        };
        console.log(config);
        const response = await axios(config);
        setProducts(response.data.detail.product_data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filterPrincipleId = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPrincipleId([...principleId, value]);
    } else {
      setPrincipleId(principleId.filter((item) => item !== value));
    }
    console.log("this is value", value);
    console.log(principleId);
  };

  const filterKategoriId = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setKategoriId([...kategoriId, value]);
    } else {
      setKategoriId(kategoriId.filter((item) => item !== value));
    }
  };

  const filterGolonganId = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGolonganId([...golonganId, value]);
    } else {
      setGolonganId(golonganId.filter((item) => item !== value));
    }
  };

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    const newFilter = products.filter((val) => {
      return val.product_name.toLowerCase().includes(searchWord);
    });

    if (searchWord === "") {
      // setSearch("");
      fetchFiltering();
    } else {
      // setSearch(newFilter);
      setProducts(newFilter);
    }
  };

  const handleDelete = async () => {
    try {
      const body = JSON.stringify({
        product_id: [productsId],
      });

      const config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product`,
        method: "DELETE",
        data: body,
      };
      const response = await axios(config);
      window.location.reload(true);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeactive = async () => {
    try {
      const body = JSON.stringify({
        product_id: [productsId],
        status: "inactive",
      });

      console.log(body);
      const config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
        url: `${process.env.REACT_APP_API_PRODUCT}product/status`,
        method: "PUT",
        data: body,
      };
      const response = await axios(config);

      window.location.reload(true);
      setShowModal1(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProdukHabisSeveral = async () => {
    try {
      const body = {
        id: selected,
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
      setPage(7);

      // navigate('/inventory/produk-habis/create-purchase', { state: { dataku: several } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFiltering();

    if (principle[0] === undefined) {
      fetchPrincipal().then((res) => setPrinciple(res));
    }

    if (golongan[0] === undefined) {
      fetchGolongan().then((res) => setGolongan(res));
    }

    if (kategori[0] === undefined) {
      fetchKategori().then((res) => setKategori(res));
    }
  }, []);

  return (
    <div className="container mx-auto w-full mt-16 lg:mt-0">
      <Modal showModal={showModal} name="menghapus" setShowModal={setShowModal} image={deleteModal} onClick={handleDelete} />
      <Modal showModal={showModal1} name="menonaktifkan" setShowModal={setShowModal1} image={nonaktifmodal} onClick={handleDeactive} />
      <div className="block lg:hidden">
        <button className="p-4 bg-sky-500" onClick={() => setIsVisible(true)}>
          ASDLKSAJDLKASJDALSKDJ
        </button>

        {/* <Drawer isVisible={isVisible} onClose={onClose} className="block lg:hidden">
          <p className="mt-20 p-10 bg-red-500 text-white font-bold text-[30px]">ASDASDSAD</p>
        </Drawer> */}
      </div>

      {/* navigation per-tab */}

      <div
        class="offcanvas offcanvas-bottom fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 left-0 right-0 border-none h-1/3 max-h-full"
        tabindex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div class="offcanvas-header flex items-center justify-between p-4">
          <h5 class="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasBottomLabel">
            Offcanvas bottom
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body flex-grow p-4 overflow-y-auto small">...</div>
      </div>

      {/* filter */}
      <div className="flex flex-wrap w-full  mt-2 items-center gap-2">
        <div className="max-w-4xl w-full ">
          <label htmlFor="search" className="sr-only">
            Search{" "}
          </label>
          <div methode="get" action="#" className="relative z-10">
            <button type="submit" id="searchsubmit" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </button>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border  rounded-md leading-5 bg-white text-gray-300 placeholder-gray-400  sm:text-sm transition duration-150 ease-in-out"
              placeholder="Cari produk"
              onChange={handleSearch}
            />
          </div>
          {/* {search.length !== 0 && (
            <div className="overflow-y-auto h-32 w-full bg-white border-2 p-3 rounded-lg">
              {search.map((item, index) => {
                return (
                  <div className="my-3" key={index}>
                    {item.product_name}
                  </div>
                );
              })}
            </div>
          )} */}
        </div>

        <div>
          <button className={`bg-orange-500 hover:bg-grey-200  font-normal py-2 px-[28px] rounded-lg inline-flex items-center gap-3`} onClick={fetchProdukHabisSeveral}>
            <span className={`text-white`}>
              <BsCartPlusFill />
            </span>
            <span className={`text-white`}>
              Create Purchase
              {/* Create Purchase */}
            </span>
          </button>
        </div>
      </div>

      {/* <div className="flex items-center mt-5">
        <input
          id="allSelect"
          type="checkbox"
          name="allSelect"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
          ref={(inputBox) => {
            if (inputBox) {
              inputBox.checked = selected.length === products.length;
              inputBox.indeterminate = selected.length > 0 && selected.length < products.length;
            }
          }}
          onChange={handleSelectAllClick}
        />
        <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900">
          Pilih Semua produk
        </label>
      </div> */}

      {products.map((item, index) => {
        const isItemSelected = isSelected(item.product_id);
        return (
          <div className="mt-3 flex items-center shadow-md rounded-xl p-3 border-2 justify-between">
            <div className="flex items-center">
              <input
                key={index}
                id={item.product_id}
                type="checkbox"
                name={item.product_name}
                checked={isItemSelected}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
                onChange={(e) => handleClick(e, item)}
              />
              <img src={Product1} alt="foto_product" className="w-20" />
              <div className="flex flex-col text-sm lg:text-base gap-1 text-clip overflow-hidden">
                <p>
                  <Link to={`/inventory/produk-aktif/detail-product/${item.product_id}`} className="hover:none">
                    {item.product_name}
                  </Link>
                </p>
                <p className="font-bold">Rp. {item.sell_price}</p>
              </div>
            </div>

            <div className="shadow-md rounded-xl">
              <button className="bg-green-400 px-3 rounded-xl hidden lg:block font-medium text-sm py-1 hover:bg-green-600 hover:text-white">Create purchase</button>
              <button className="bg-green-400 px-3 rounded-xl block lg:hidden font-medium text-sm py-1 hover:bg-green-600 hover:text-white">
                <BsCartPlusFill />
              </button>
            </div>

            {/* <Menu
              menuButton={
                <MenuButton>
                  <div className="p-3 shadow-md cursor-pointer rounded-xl hidden lg:block">
                    <SlOptionsVertical className="rotate-90" />
                  </div>
                </MenuButton>
              }
              transition
            >
              <MenuItem>Update stock & Harga</MenuItem>
              <MenuItem
                value={item.product_id}
                onClick={() => {
                  setShowModal1(true);
                  setProductsId(item.product_id);
                }}
              >
                Deactive
              </MenuItem>
              <MenuItem
                value={item.product_id}
                onClick={() => {
                  setShowModal(true);
                  setProductsId(item.product_id);
                }}
              >
                Hapus
              </MenuItem>
            </Menu> */}
          </div>
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
  );
};

export default ProductHabis;
