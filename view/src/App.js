import { Route, Routes } from 'react-router-dom'

import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Login from './components/pages/login'
import ProductDetails from './components/pages/PoductDetails'
import Cart from './components/pages/cart'
import Success from './components/pages/Success'
import Failed from './components/pages/Failed'

function App() {
  return  <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product-details' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/success' element={<Success />} />
            <Route path='/cart/failed' element={<Failed />} />
          </Routes>

}

export default App;
