import { Route, Routes } from 'react-router-dom'

import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Login from './components/pages/login'

function App() {
  return  <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
          </Routes>

}

export default App;
