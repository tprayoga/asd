import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { MdOutlineDashboard, MdOutlineInventory2 } from "react-icons/md";
import { BsCartPlus, BsPeopleFill } from "react-icons/bs";
import { RiFileChartLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { GrNotes } from "react-icons/gr";
import { TbDiscount } from "react-icons/tb";
import { FaBars, FaUserCog } from "react-icons/fa";
import Logo from "../../assets/icons/logoOlin.png";
// import { Link } from "react-router-dom";

const SidebarComponents = () => {
  const { toggleSidebar, broken } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar breakPoint="lg" backgroundColor="white" className="shadow-md" width="310px">
        <div>
          <img src={Logo} alt="" className="mt-3 mb-10 ml-16" />
          <Menu>
            <MenuItem icon={<MdOutlineDashboard />}>Dashboard</MenuItem>
            <MenuItem icon={<BsCartPlus />}>Purchase</MenuItem>
            <MenuItem icon={<MdOutlineInventory2 />}>Inventory</MenuItem>
            <MenuItem icon={<GrNotes />}>Billing</MenuItem>
            <SubMenu icon={<RiFileChartLine />} label="Reporting">
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>
            <MenuItem icon={<TbDiscount />}>Discount/Promo</MenuItem>
            <MenuItem icon={<BsPeopleFill />}>Pelanggan</MenuItem>
            <MenuItem icon={<FaUserCog />}>User Management</MenuItem>
            <SubMenu icon={<FiSettings />} label="Services">
              <MenuItem> Google maps</MenuItem>
              <MenuItem> Open street maps</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </Sidebar>
      <main>
        <div style={{ display: "flex", padding: 10 }}>
          {broken ? (
            <button className="sb-button fixed z-30 top-[15px] right-5" onClick={() => toggleSidebar()}>
              <FaBars />
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default SidebarComponents;

// <div className="h-screen flex items-end justify-end border-r-2 border-gray-200">
//   <button className="fixed lg:hidden z-20 top-[5px] right-8 bg-white w-10 h-10   flex justify-center items-center text-white text-4xl hover:bg-teal-800 duration-300" onClick={toggleSidebar}>
//     <span className="text-black">
//       <FaBars className="text-[20px] " />
//     </span>
//   </button>

//   <div className={` ${open ? "w-48 px-2 " : "w-0 "} lg:w-72 bg-white  h-screen   relative duration-500`}>
//     <div className=" justify-center mt-3">
//       <img src={Logo} alt="" className={`${!open && "invisible"} hidden lg:block ml-20`} />
//       <h1 className={`text-white  font-medium text-2xl text-center duration-200 block lg:hidden ${!open && "invisible"}`}>LOGO</h1>
//     </div>
//     <ul className={`pt-6  ${!open && "invisible"}`}>
//       {Menus.map((Menu, index) => (
//         <>
//           <li
//             key={index}
//             className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#E5EBF1] hover:text-blue-500 text-black text-base font-normal lg:font-medium items-center gap-x-4
//           ${Menu.gap ? "mt-10 lg:mt-80" : "mt-2"} `}
//           >
//             {Menu.icon ? Menu.icon : <MdOutlineDashboard />}

//             <span className="flex-1">{Menu.title}</span>
//             {Menu.subMenus && <BsChevronDown onClick={() => setSubMenuOpen(!subMenuOpen)} className={`${subMenuOpen && "rotate-180"}`} />}
//           </li>
//           {Menu.subMenus && subMenuOpen && open && (
//             <ul>
//               {Menu.subMenus.map((subMenuItem, idx) => (
//                 <li key={idx} className="flex  rounded-md p-2 cursor-pointer hover:bg-[#E5EBF1] hover:text-blue-500 text-black text-base font-normal lg:font-medium items-center gap-x-4">
//                   {subMenuItem.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {Menu.subMenusSetting && subMenuOpen && open && (
//             <ul>
//               {Menu.subMenus.map((subMenuItem, idx) => (
//                 <li key={idx} className="flex  rounded-md p-2 cursor-pointer hover:bg-[#E5EBF1] hover:text-blue-500 text-black text-base font-normal lg:font-medium items-center gap-x-4">
//                   {subMenuItem.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       ))}

//       {/* <div className="flex w-52 border-t-2 items-center fixed bottom-4 rounded-md p-2 cursor-pointer hover:bg-[#E5EBF1] hover:text-blue-500 text-black text-base font-normal lg:font-medium items-center gap-x-4">
//         <MdLogout />
//         <li className="">Logout</li>
//       </div> */}
//     </ul>
//   </div>
// </div>
