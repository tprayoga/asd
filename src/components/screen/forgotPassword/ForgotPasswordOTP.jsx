import React from 'react';
import Logo from '../../../assets/icons/olinlogo.png';
import Carousel from '../../common/particles.jsx/Carousel';
import mail from '../../../assets/icons/mail.png';
import wa from '../../../assets/icons/wa.png';
import axios from 'axios';
import { GeneratePublicToken } from '../../../utils/GeneratePublicToken';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordOTP = ({ forgotPasswordData, setForgotPasswordData }) => {
  const navigate = useNavigate();

  const selectOtp = async () => {
    const TokenAuth = GeneratePublicToken().Authorization;
    const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

    try {
      const body = JSON.stringify({
        type: 'email',
        receiver: forgotPasswordData.email,
      });
      const config = {
        headers: {
          Authorization: TokenAuth,
          'Authorization-ID': TokenAuthID,
        },
        url: `${process.env.REACT_APP_API_ACCOUNT}pos/password/forgot/otp`,
        method: 'POST',
        data: body,
      };
      await axios(config);
      // console.log(response);
      navigate('/forgot-password/input/otp');
    } catch (error) {
      // console.log(error);
    }
  };

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

              <p className="mt-5 text-gray-500 ">Pilih salah satu metode dibawah ini untuk mendapatkan kode verifikasi.</p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <div className="flex flex-row justify-between p-3 shadow-md rounded-lg text-sm   duration-200 hover:scale-110" onClick={selectOtp}>
                  <div className="flex items-center gap-2 ">
                    <img src={mail} alt="mail" className="w-7" />
                    <p>Email</p>
                  </div>
                  <div className="mt-1">
                    <p>{forgotPasswordData.email}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between p-3 shadow-md  duration-200 hover:scale-110 rounded-lg mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <img src={wa} alt="mail" className="w-6" />
                    <p>Whatsapp</p>
                  </div>
                  <div>
                    <p>example@mail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p>
                  Kembali ke <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
                </p>
              </div>
              <div className="flex flex-col xl:flex-row items-center justify-center gap-2 my-12">
                <p className="font-medium text-center">Pelajari tentang OLIN</p>
                <p className="border-1 text-center p-2 rounded-xl border-orange-500">Unduh Aplikasi</p>
              </div>

              {/* <div className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet? <p className="text-blue-500 underline focus:outline-none hover:underline focus:underline hover:underline">Sign up</p>.
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;
