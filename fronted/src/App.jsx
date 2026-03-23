import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GeneroList from './pages/Genero/GeneroList';
import GeneroForm from './pages/Genero/GeneroForm';
import DirectorList from './pages/Director/DirectorList';
import DirectorForm from './pages/Director/DirectorForm';
import ProductoraList from './pages/Productora/ProductoraList';
import ProductoraForm from './pages/Productora/ProductoraForm';
import TipoList from './pages/Tipo/TipoList';
import TipoForm from './pages/Tipo/TipoForm';
import MediaList from './pages/Media/MediaList';
import MediaForm from './pages/Media/MediaForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Rutas de Géneros */}
          <Route path="generos" element={<GeneroList />} />
          <Route path="generos/nuevo" element={<GeneroForm />} />
          <Route path="generos/editar/:id" element={<GeneroForm />} />
          
          {/* Rutas de Directores */}
          <Route path="directores" element={<DirectorList />} />
          <Route path="directores/nuevo" element={<DirectorForm />} />
          <Route path="directores/editar/:id" element={<DirectorForm />} />
          
          {/* Rutas de Productoras */}
          <Route path="productoras" element={<ProductoraList />} />
          <Route path="productoras/nuevo" element={<ProductoraForm />} />
          <Route path="productoras/editar/:id" element={<ProductoraForm />} />
          
          {/* Rutas de Tipos */}
          <Route path="tipos" element={<TipoList />} />
          <Route path="tipos/nuevo" element={<TipoForm />} />
          <Route path="tipos/editar/:id" element={<TipoForm />} />
          
          {/* Rutas de Media */}
          <Route path="medias" element={<MediaList />} />
          <Route path="medias/nuevo" element={<MediaForm />} />
          <Route path="medias/editar/:id" element={<MediaForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
