import { Route, Routes } from 'react-router-dom'

import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Login from './components/pages/login'
import ProductDetails from './components/pages/PoductDetails'

function App() {
  return  <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product-details' element={<ProductDetails/>} />
          </Routes>

}

export default App;
