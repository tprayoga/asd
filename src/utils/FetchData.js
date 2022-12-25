import { GeneratePublicToken } from './GeneratePublicToken';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

// ====================== Check Email Status ====================== //
export const CheckEmailStatus = async () => {
  const TokenAuth = GeneratePublicToken().Authorization;
  const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

  try {
    const body = JSON.stringify({
      email: '',
      is_use_otp: false,
    });
    console.log(body);

    const config = {
      headers: {
        Authorization: TokenAuth,
        'Authorization-ID': TokenAuthID,
      },
      url: `${process.env.REACT_APP_API}pos/user/exist`,
      method: 'POST',
      data: body,
    };

    const response = await axios(config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// ====================== fetch Product Details ====================== //
export const fetchProducts = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ` + token,
      },
      url: `${process.env.REACT_APP_API_PRODUCT}product/inventories?offset=1&limit=12&status=1`,
      method: 'GET',
    };
    console.log(config);
    const response = await axios(config);
    return await response.data.detail;
  } catch (error) {
    console.log(error);
  }
};

// ====================== fetch filtering inventory ====================== //
export const fetchPrincipal = async () => {
  const TokenAuth = GeneratePublicToken().Authorization;
  const TokenAuthID = GeneratePublicToken()['Authorization-ID'];

  try {
    const config = {
      headers: {
        Authorization: TokenAuth,
        'Authorization-ID': TokenAuthID,
      },
      url: `${process.env.REACT_APP_API_PRODUCT}product/principal`,
      method: 'GET',
    };
    let response = await axios(config);
    return await response.data.detail;
  } catch (error) {
    console.log(error);
  }
};

export const fetchKategori = async () => {
  const TokenAuth = GeneratePublicToken().Authorization;
  const TokenAuthID = GeneratePublicToken()['Authorization-ID'];
  try {
    const config = {
      headers: {
        Authorization: TokenAuth,
        'Authorization-ID': TokenAuthID,
      },
      url: `${process.env.REACT_APP_API_PRODUCT}product/category`,
      method: 'GET',
    };
    let response = await axios(config);
    console.log(response);
    return await response.data.detail;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGolongan = async () => {
  const TokenAuth = GeneratePublicToken().Authorization;
  const TokenAuthID = GeneratePublicToken()['Authorization-ID'];
  try {
    const config = {
      headers: {
        Authorization: TokenAuth,
        'Authorization-ID': TokenAuthID,
      },
      url: `${process.env.REACT_APP_API_PRODUCT}product/label`,
      method: 'GET',
    };
    let response = await axios(config);
    return await response.data.detail;
  } catch (error) {
    console.log(error);
  }
};

// ====================== get platform inventory ====================== //

export const fetchPlatform = async () => {
  const TokenAuth = GeneratePublicToken().Authorization;
  const TokenAuthID = GeneratePublicToken()['Authorization-ID'];
  try {
    const config = {
      headers: {
        Authorization: TokenAuth,
        'Authorization-ID': TokenAuthID,
      },
      url: `${process.env.REACT_APP_API_PRODUCT}product/platform`,
      method: 'GET',
    };
    let response = await axios(config);
    return await response.data.detail;
  } catch (error) {
    console.log(error);
  }
};