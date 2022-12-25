import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { renewTokenUser } from './redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

// =========================== Pages =========================== //

// Login & Forgot Password
import EmailLogin from './components/screen/login/EmailLogin';
import PasswordLogin from './components/screen/login/PasswordLogin';
import ForgotPassword from './components/screen/forgotPassword/ForgotPassword';
import ForgotPasswordOTP from './components/screen/forgotPassword/ForgotPasswordOTP';
import LoginOTP from './components/screen/login/LoginOTP';
import ForgotPasswordInputOTP from './components/screen/forgotPassword/ForgotPasswordInputOTP';
import ForgotPasswordSetupPassword from './components/screen/forgotPassword/ForgotPasswordSetupPassword';

// Inventory
import ProductActive from './pages/inventory/produkAktif/ProductActive';
import ImportProduct from './components/screen/inventory/productActive/ImportProduct';
import DetailsProductActive from './pages/inventory/produkAktif/DetailsProductActive';
import EditDetailsProductActive from './pages/inventory/produkAktif/EditDetailsProductActive';
import TambahProdukActive from './pages/inventory/produkAktif/TambahProdukActive';
import ProductHabis from './pages/inventory/produkHabis/ProductHabis';
import ProductHold from './pages/inventory/produkHold/ProductHold';
import CreatePurchase from './pages/inventory/produkHabis/CreatePurchase';
import CetakSP from './pages/inventory/produkHabis/CetakSP';
import Counter from './components/common/particles.jsx/Counter';
import ProductExpired from './pages/inventory/produkExpired/ProductExpired';

const App = () => {
  const dispatch = useDispatch();

  //Renew Token
  setInterval(() => {
    console.log('Renew Token Running...');
    dispatch(renewTokenUser());
  }, 600000);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
  });

  const [getSeveral, setGetSeveral] = useState([]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<EmailLogin formData={formData} setFormData={setFormData} />} />
        <Route path="/" element={<EmailLogin formData={formData} setFormData={setFormData} />} />
        <Route path="/login/password" element={<PasswordLogin formData={formData} setFormData={setFormData} />} />
        <Route path="/login/existing/otp" element={<LoginOTP formData={formData} setFormData={setFormData} />} />

        {/* Forgot password */}
        <Route path="/forgot-password" element={<ForgotPassword forgotPasswordData={forgotPasswordData} setForgotPasswordData={setForgotPasswordData} />} />
        <Route path="/forgot-password/method/otp" element={<ForgotPasswordOTP forgotPasswordData={forgotPasswordData} setForgotPasswordData={setForgotPasswordData} />} />
        <Route path="/forgot-password/input/otp" element={<ForgotPasswordInputOTP forgotPasswordData={forgotPasswordData} setForgotPasswordData={setForgotPasswordData} />} />
        <Route path="/forgot-password/new-password" element={<ForgotPasswordSetupPassword forgotPasswordData={forgotPasswordData} setForgotPasswordData={setForgotPasswordData} />} />

        {/* Inventory */}
        <Route path="/home" element={<ProductActive />} />
        <Route path="/inventory/produk-aktif/import-produk" element={<ImportProduct />} />
        <Route path="/inventory/produk-aktif/detail-product/:id" element={<DetailsProductActive />} />
        <Route path="/inventory/produk-aktif/edit-product-details/:id" element={<EditDetailsProductActive />} />
        <Route path="/inventory/produk-aktif/Tambah-produk" element={<TambahProdukActive />} />

        <Route path="/inventory/produk-habis" element={<ProductHabis setGetSeveral={setGetSeveral} />} />
        <Route path="/inventory/produk-habis/create-purchase" element={<CreatePurchase getSeveral={getSeveral} />} />
        <Route path="/inventory/produk-habis/cetakSP" element={<CetakSP />} />

        <Route path="/inventory/produk-hold" element={<ProductHold />} />

        <Route path="/inventory/produk-expired" element={<ProductExpired />} />

        <Route path="/test" element={<Counter />} />
      </Routes>
    </div>
  );
};

export default App;
