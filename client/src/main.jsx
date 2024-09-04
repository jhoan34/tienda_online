import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {CartProvider } from './components/context/filters'
import { CartProviderDos } from './components/context/cart'
import { CartProviderUser } from './components/context/user';
import { FetchProvider } from './components/context/fetch.jsx'
import { FetchCardItemProvider } from './components/context/productitem';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProviderDos>
    <CartProvider> 
      <CartProviderUser>
        <FetchProvider>
          <FetchCardItemProvider>
            <App />
          </FetchCardItemProvider>
        </FetchProvider>
      </CartProviderUser> 
    </CartProvider>
  </CartProviderDos>
)
