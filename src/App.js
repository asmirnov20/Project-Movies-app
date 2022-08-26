import './App.scss';
import { Routes, Route } from 'react-router-dom'
import 'swiper/scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
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
          {/* <Navigate to '/:category' replace - так как тоже ссылается на Catalog */}
          <Route path=':category/search/:searchWord' element={<Catalog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
