// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { LoginPage } from './pages/user';
import { Home } from './pages/home';
import { ContacPage } from './pages/contacto';
import { ProductsPage } from './pages/productos';
import './App.css';
import { Headers } from './components/headers';
import { Cart } from './components/carrito';
import Homess from './pages/dasboard';
import { useUserInfo } from './components/context/user';
import { ProductoItem } from './components/productoItem';
import { ProductForm } from './components/fetchdatos';
import { Pagos } from './pages/pagos';
import { Response } from './pages/response';
import { ResponseiNdevidual} from './pages/responseindevidual';


function App() {
  const { userInfo } = useUserInfo();
 
  return (
      <div className='App'>
        <HashRouter>
          <Headers />
          <Cart />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/Contacto' element={<ContacPage />} />
            <Route path='/Register' element={<Headers />} />
            <Route path='/productos' element={<ProductsPage />} />
            <Route path='/productos/:category' element={<ProductsPage />} />
            <Route path='/productos/:category/:id' element={<ProductoItem  userEmail={userInfo?.email}/>} />

          
            <Route path='/user/admin/posts' element={<ProductForm />} />  
            <Route path='/response' element={<Response userEmail={userInfo?.email} />} />

            <Route path='/responseiNdevidual' element={<ResponseiNdevidual userEmail={userInfo?.email} />} />

            {userInfo ? (
              <Route path='/user/dashboard' element={<Homess />} />
            ) : (
              <Route path='/user/dashboard' element={<Navigate to="/Login" />} />
            )}

            <Route path='/pagos/:id' element={<Pagos/>} />
          </Routes>
        </HashRouter>
      </div>
  );
}

export default App;
