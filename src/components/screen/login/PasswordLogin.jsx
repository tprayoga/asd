import React, { useState } from 'react';
import Logo from '../../../assets/icons/olinlogo.png';
import Input from '../../common/particles.jsx/Input';
import Carousel from '../../common/particles.jsx/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { GeneratePublicToken } from '../../../utils/GeneratePublicToken';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/features/auth/authSlice';
import HOC from '../../HOC';

const PasswordLogin = ({ formData, setFormData }) => {
  const [password, setPassword] = useState('');
  const [msgFail, setMsgFail] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(formData.email);

  const handleLogin = async (e) => {
    e.preventDefault();
    const TokenAuth = GeneratePublicToken().Authorization;
    const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

    // if (isChecked) {
    //   localStorage.checked = isChecked;
    //   localStorage.password = password;
    //   localStorage.email = formData.email;
    //   navigate('/login/password');
    // }

    try {
      const body = JSON.stringify({
        email: formData.email,
        password: password,
      });
      // console.log(body);

      const config = {
        headers: {
          Authorization: TokenAuth,
          'Authorization-ID': TokenAuthID,
        },
        url: `${process.env.REACT_APP_API_ACCOUNT}pos/login`,
        method: 'POST',
        data: body,
      };

      let response = await axios(config);
      // console.log(response.data.detail.token);
      setMsgSuccess('Login Success');
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 2000);

      dispatch(
        setUser({
          accessToken: response.data.detail.token.access,
          accessExpired: response.data.detail.token.access_expired,
          renewToken: response.data.detail.token.renew,
          renewExpired: response.data.detail.token.renew_expired,
        })
      );
      navigate('/home');
    } catch (error) {
      // console.log(error);
      setMsgFail('Password Incorrect');
      setShow1(true);

      setTimeout(() => {
        setShow1(false);
      }, 2000);
    }
  };

  // useEffect(() => {
  //   setPassword(localStorage.getItem('password'));
  //   setEmail(localStorage.getItem('email'));
  // if (isChecked === true) {
  //   navigate('/login/password');
  //  }
  // }, []);
  // handle check remember me

  // const [remember, setRemember] = useState({
  //   email: formData.email,
  //   password: password,
  //   isChecked: false,
  // });

  // const componentDidMount = () => {
  //   if (localStorage.checkbox && localStorage.email !== '') {
  //     setRemember({
  //       email: localStorage.email,
  //       password: localStorage.password,
  //       isChecked: true,
  //     });
  //   }
  // };

  // const onChangeCheckbox = (e) => {
  //   setIsChecked(e.target.checked);
  //   console.log(isChecked);
  // };

  // useEffect(() => {
  //   if (isChecked) {
  //     localStorage.setItem('email', formData.email);
  //     localStorage.setItem('password', password);
  //   } else {
  //     localStorage.removeItem('email');
  //     localStorage.removeItem('password');
  //   }
  //   console.log('REMEMBER ME', isChecked);
  // }, [isChecked]);

  return (
    <div className="bg-white">
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
              <h2 className="text-4xl font-bold text-center text-gray-700  mt-10 lg:mt-28">Login to OLIN</h2>

              <p className="mt-3 text-gray-500 ">Sign in to access your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mt-8">
                <Input label="Email Address" type="email" name="email" placeholder="Enter your email address" value={formData.email} />

                <div className="">
                  {show1 ? (
                    <div className="relative">
                      <div className="absolute top-[-67px] right-0 text-red-500" role="alert">
                        <p className="text-xs">{msgFail}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="">
                  {show ? (
                    <div className="relative">
                      <div className="absolute top-[-67px] right-0 text-green-500" role="alert">
                        <p className="text-sm">{msgSuccess}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="relative">
                  <p className="mt-6 absolute -top-[94px] md:-top-[56px] right-1 text-sm md:right-3 text-blue-500">
                    <Link to="/login">Ubah</Link>
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-blue-400 ">
                      Password
                    </label>
                    {/* <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
                      Forgot password?
                    </a> */}
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-row mt-6 justify-end">
                  {/* <div className="flex gap-1">
                  <input type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
                  <p className="text-sm">Remember me</p>
                </div> */}
                  <div>
                    <p className="text-red-500 hover:underline cursor-pointer text-sm">
                      <Link to="/forgot-password">Lupa password?</Link>
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                  >
                    Sign in
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

export default HOC(PasswordLogin, 'Login-required');
