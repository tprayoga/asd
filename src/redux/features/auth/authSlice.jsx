import { createSlice } from '@reduxjs/toolkit';
import cookie from 'js-cookie';
import axios from 'axios';

function createCookie(name, value, minutes) {
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    var expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

const initialState = {
  accessToken: '',
  accessExpired: '',
  renewToken: '',
  renewExpired: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.accessExpired = payload.accessExpired;
      state.renewToken = payload.renewToken;
      state.renewExpired = payload.renewExpired;
      createCookie('accessToken', payload.accessToken, 60);
      createCookie('accessExpired', payload.accessExpired);
      createCookie('renewToken', payload.renewToken);
      createCookie('renewExpired', payload.renewExpired);
    },
    renewTokenUser: () => {
      const refreshToken = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_ACCOUNT}token/renew`, {
            headers: {
              Authorization: 'Bearer ' + cookie.get('renewToken'),
            },
          });
          // state.accessToken = response.data.detail.token;
          // state.accessExpired = response.data.detail.token_expired;
          console.log('update token');
          console.log(response.data.detail.token);
          console.log(response.data.message);
          createCookie('accessToken', response.data.detail.token, 60);
          createCookie('accessExpired', response.data.detail.token_expired);
        } catch (error) {
          // console.log(error);
        }
      };
      refreshToken();
    },

    logout: (state) => {
      state.accessToken = null;
      state.accessExpired = null;
      state.renewToken = null;
      state.renewExpired = null;
      cookie.remove('accessToken');
      cookie.remove('accessExpired');
      cookie.remove('renewToken');
      cookie.remove('renewExpired');
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, renewTokenUser, logout } = authSlice.actions;

export default authSlice.reducer;
