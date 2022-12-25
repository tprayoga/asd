import React from "react";
import Logo from "../../assets/icons/logoOlin.png";

const Header = () => {
  return (
    <nav className="bg-white p-2  block lg:hidden fixed z-20 w-full top-0 left-0 border-b-2 border-gray-200 ">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Olin Logo" />
        </a>
        <div className="flex md:order-2">
          {/* <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button> */}
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"></div>
      </div>
    </nav>
  );
};

export default Header;
