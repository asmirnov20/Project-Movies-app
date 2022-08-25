import './App.scss';
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout';
import Catalog from './pages/Catalog'
import Home from './pages/Home'
import Detail from './pages/Detail'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':category' element={<Catalog />} />
          <Route path=':category/:id' element={<Detail />} />
          <Route path=':category/search/:searchWord' element={<Catalog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
