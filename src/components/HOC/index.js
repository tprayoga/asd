import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { renewTokenUser } from "../../redux/features/auth/authSlice";

const HOC = (WrappedComponent, type = "required-auth") => {
  const Wrapper = (props) => {
    const authStore = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log('HOC Running...', authStore.accessToken);

    useEffect(() => {
      if (!authStore.renewTokenUser && type === "required-auth" && !cookie.get("renewToken")) {
        console.log("Pindah cuk ke login");
        navigate("/login");
      }
    }, [authStore.renewTokenUser, navigate]);

    // User memiliki token
    useEffect(() => {
      if (cookie.get("renewToken") && type === "login-required") {
        navigate("/home");
      }
    }, [authStore.accessToken, navigate]);

    useEffect(() => {
      if (cookie.get("renewToken") && type === "Register-required") {
        navigate("/home");
      }
    }, [authStore.accessToken, navigate]);

    // Renew Access Token
    useEffect(() => {
      console.log("TOKEN: ", Boolean(!cookie.get("accessToken")));
      if (!cookie.get("accessToken")) {
        dispatch(renewTokenUser());
      }
    }, [authStore.accessToken, dispatch]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default HOC;
