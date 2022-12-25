import React, { useState } from "react";
import Logo from "../../../assets/icons/olinlogo.png";
import Input from "../../common/particles.jsx/Input";
import Carousel from "../../common/particles.jsx/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { GeneratePublicToken } from "../../../utils/GeneratePublicToken";
import axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";
import HOC from "../../HOC";
// import sha256 from "sha256";
// import Cookies from "js-cookie";

const EmailLogin = ({ formData, setFormData }) => {
  const [msgFail, setMsgFail] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();

  const CheckEmailStatus = async (e) => {
    e.preventDefault();
    const TokenAuth = GeneratePublicToken().Authorization;
    const TokenAuthID = GeneratePublicToken()["Authorization-ID"];

    try {
      const body = JSON.stringify({
        email: formData.email,
        is_use_otp: Boolean(false),
      });
      // console.log(body);

      const config = {
        headers: {
          Authorization: TokenAuth,
          "Authorization-ID": TokenAuthID,
        },
        url: `${process.env.REACT_APP_API_ACCOUNT}pos/user/exist`,
        method: "POST",
        data: body,
      };

      let response = await axios(config);
      // console.log(config);
      // console.log(response);
      // console.log(response.data.detail.status);

      if (response.data.detail.status === "tidak terdaftar") {
        setMsgFail("Email Anda Belum Terdaftar");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
        // navigate('/forgot-password');
      } else if ((response.data.detail.status_code === 5, 2)) {
        setShow1(true);
        setMsgSuccess(<BsCheckCircleFill />);
        setTimeout(() => {
          setShow1(false);
          navigate("/login/password");
        }, 2000);
      } else if (response.data.detail.status_code === 4) {
        setShow1(true);
        setMsgSuccess(<BsCheckCircleFill />);
        setTimeout(() => {
          setShow1(false);
          navigate("/login/existing/otp");
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // let hash = sha256('testingpasswordhashed');
  // console.log(hash);
  // Cookies.set('password', hash);
  // console.log(Cookies.get(hash));
  return (
    <div className="bg-white ">
      <div className="flex flex-col-reverse lg:flex-row justify-center h-screen">
        <div className="order-first md:order-last bg-cover lg:block lg:w-2/3">
          <div className="flex items-center h-full px-20 bg-[#EAF3FE] bg-opacity-40">
            <div className="w-full my-10">
              <Carousel />
            </div>
          </div>
        </div>

        <div className="flex mt-20 w-full max-w-md px-6 mx-auto lg:w-2/6 ">
          <div className="flex-1">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={Logo} alt="" className="mt-16 lg:my-0 w-[100px] lg:w-[200px]" />
              <h2 className="text-4xl font-bold text-center  text-black mt-10 lg:mt-28">Login to OLIN</h2>

              <p className="mt-3 text-gray-500 ">Sign in to access your account</p>
            </div>
            <form onSubmit={CheckEmailStatus}>
              <div className="mt-8">
                <Input label="Email Address" type="email" name="email" placeholder="Example@mail.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                <div className="">
                  {show ? (
                    <div className="relative">
                      <div className="absolute top-[-67px] right-0 text-red-500" role="alert">
                        <p className="text-xs">{msgFail}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="">
                  {show1 ? (
                    <div className="relative">
                      <div className="absolute top-[-29px] right-4 text-green-500" role="alert">
                        <p className="text-sm">{msgSuccess}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <p className="text-red-500 hover:underline cursor-pointer text-end text-sm mt-2">
                    <Link to="/forgot-password">Lupa password?</Link>
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                  >
                    Selanjutnya
                  </button>
                </div>

                <div className="relative mt-6 h-px bg-gray-300">
                  <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span className="bg-white px-4 text-xs text-gray-500 uppercase">Belum Registrasi?</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Daftar
                  </button>
                </div>

                <div className="flex flex-col xl:flex-row items-center justify-center gap-2 my-12">
                  <p className="font-medium text-center">Pelajari tentang OLIN</p>
                  <p className="border-1 text-center p-2 rounded-xl border-orange-500">Unduh Aplikasi</p>
                </div>

                {/* <div className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet? <p className="text-blue-500 underline focus:outline-none hover:underline focus:underline hover:underline">Sign up</p>.
              </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(EmailLogin, "Login-required");
