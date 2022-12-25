import React, { useState } from 'react';
import Logo from '../../../assets/icons/olinlogo.png';
import Input from '../../common/particles.jsx/Input';
import Carousel from '../../common/particles.jsx/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneratePublicToken } from '../../../utils/GeneratePublicToken';

const ForgotPasswordSetupPassword = ({ forgotPasswordData, setForgotPasswordData }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msgFail, setMsgFail] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [showText, setShowText] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();

  const setupPassword = async (e) => {
    e.preventDefault();
    const TokenAuth = GeneratePublicToken().Authorization;
    const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

    if (currentPassword !== newPassword) {
      setMsgFail('Your password is not match');
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    } else if (currentPassword === newPassword) {
      try {
        const body = JSON.stringify({
          email: forgotPasswordData.email,
          new_password: currentPassword,
        });
        // console.log(body);

        const config = {
          headers: {
            Authorization: TokenAuth,
            'Authorization-ID': TokenAuthID,
          },
          url: `${process.env.REACT_APP_API_ACCOUNT}pos/password/forgot`,
          method: 'PUT',
          data: body,
        };
        await axios(config);
        // console.log(response);

        setShow1(true);
        setMsgSuccess('Your password has been changed');
        setShowText(true);
        setTimeout(() => {
          setShow1(false);
          navigate('/');
        }, 2000);
      } catch (error) {
        // console.log(error);
      }
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

              {showText === true ? (
                <h2 className="text-3xl font-bold text-center  text-black mt-10 lg:mt-28 mb-6">Kata Sandi Berhasil Diperbarui</h2>
              ) : (
                <h2 className="text-3xl font-bold text-center  text-black mt-10 lg:mt-28 mb-6">Masukan kata sandi baru</h2>
              )}
            </div>

            <div className="">
              {show ? (
                <div className="relative">
                  <div className="absolute top-[34px] right-2 text-red-500" role="alert">
                    <p className="text-xs">{msgFail}</p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="">
              {show1 ? (
                <div className="relative">
                  <div className="absolute top-[32px] right-2 text-green-500" role="alert">
                    <p className="text-sm">{msgSuccess}</p>
                  </div>
                </div>
              ) : null}
            </div>
            <form onSubmit={setupPassword}>
              <div className="mt-8">
                <div className="mt-6">
                  <Input label="Password Baru" type="password" name="password" placeholder="Enter your new password" onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="mt-6">
                  <Input label="Konfirmasi Password Baru" type="password" name="konfirmasi-password" placeholder="Re-enter your password" onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                  >
                    Kirim
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Kembali ke{' '}
                    <span className="text-blue-500 hover:underline cursor-pointer">
                      <Link to="/">Login</Link>
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

export default ForgotPasswordSetupPassword;
