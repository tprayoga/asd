import React, { useState } from 'react';
import Logo from '../../../assets/icons/olinlogo.png';
import Input from '../../common/particles.jsx/Input';
import Carousel from '../../common/particles.jsx/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { BsCheckCircleFill } from 'react-icons/bs';
import { GeneratePublicToken } from '../../../utils/GeneratePublicToken';
import axios from 'axios';

const ForgotPasswordInputOTP = ({ forgotPasswordData, setForgotPasswordData }) => {
  const [otp, setOtp] = useState('');
  const [msgFail, setMsgFail] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();

  const resendOtp = async () => {
    const TokenAuth = GeneratePublicToken().Authorization;
    const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

    try {
      const body = JSON.stringify({
        email: forgotPasswordData.email,
      });
      // console.log(body);
      const config = {
        headers: {
          Authorization: TokenAuth,
          'Authorization-ID': TokenAuthID,
        },
        url: `${process.env.REACT_APP_API_ACCOUNT}otp/resend`,
        method: 'POST',
        data: body,
      };
      await axios(config);
      navigate('/forgot-password/input/otp');
      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const TokenAuth = GeneratePublicToken().Authorization;
    const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

    try {
      const body = JSON.stringify({
        email: forgotPasswordData.email,
        code: otp,
        is_need_access: Boolean(false),
      });
      // console.log(body);
      const config = {
        headers: {
          Authorization: TokenAuth,
          'Authorization-ID': TokenAuthID,
        },
        url: `${process.env.REACT_APP_API_ACCOUNT}pos/otp/verify`,
        method: 'POST',
        data: body,
      };

      let response = await axios(config);
      // console.log(response);
      // console.log(response.data.message.en);

      if (response.data.message.en === 'success') {
        setMsgSuccess(<BsCheckCircleFill />);
        setShow1(true);
        setTimeout(() => {
          setShow1(false);
          navigate('/forgot-password/new-password');
        }, 2000);
      } else if (response.data.message.en !== 'success') {
        setMsgFail('OTP not match');
        setShow(true);

        setTimeout(() => {
          setShow(false);
        }, 2000);
      }
      // navigate('/forgot-password/setup-new-password');
    } catch (error) {
      // console.log(error);
    }
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span className="text-red-500 font-medium">OTP Expired</span>;
    } else {
      // Render a countdown

      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
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

              <p className="mt-5 text-gray-500 ">
                Kode OTP telah dikirimkan kepada Alamat Email <span className="text-blue-500">{forgotPasswordData.email}</span>
              </p>
            </div>
            <form onSubmit={verifyOtp}>
              <div className="mt-8">
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute top-0 right-0">
                      <Countdown renderer={renderer} date={Date.now() + 180000} />
                    </div>
                    <Input label="Kode OTP" placeholder="Enter your OTP" onChange={(e) => setOtp(e.target.value)} />
                  </div>
                </div>

                <div className="">
                  {show ? (
                    <div className="relative">
                      <div className="absolute top-[-30px] right-3 text-red-500" role="alert">
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

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                  >
                    Kirim
                  </button>
                  <p className="text-center mt-5">
                    Belum mendapatkan kode OTP? <br />
                    <button className="text-orange-500 hover:underline cursor-pointer font-bold" onClick={resendOtp}>
                      Kirim Ulang kode OTP
                    </button>
                  </p>
                  <p className="mt-3 text-center">
                    Atau ubah metode penerimaan kode verifikasi.{' '}
                    <span className="text-blue-500 font-bold hover:underline cursor-pointer">
                      <Link to="/forgot-password/method/otp">Ubah</Link>
                    </span>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordInputOTP;
