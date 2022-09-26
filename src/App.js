import './App.scss';
import { Routes, Route } from 'react-router-dom'
import 'swiper/scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import Layout from './components/Layout';
import Catalog from './pages/Catalog'
import Home from './pages/Home'
import Detail from './pages/Detail'
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()

  return (
    <LayoutGroup>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=':urlCategory' element={<Catalog />} />
            <Route path=':urlCategory/:id' element={<Detail />} />
            <Route path=':urlCategory/search/:urlSearch' element={<Catalog />} />
            <Route path=':urlCategory/find/:genre' element={<Catalog />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default App;
