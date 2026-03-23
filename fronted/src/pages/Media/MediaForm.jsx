import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getMediaById, createMedia, updateMedia } from '../../services/mediaService';
import { getGeneros } from '../../services/generoService';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import { ArrowLeft, Save } from 'lucide-react';

export default function MediaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioEstreno: new Date().getFullYear(),
    generoPrincipal: '',
    directorPrincipal: '',
    productora: '',
    tipo: ''
  });
  
  const [listas, setListas] = useState({
    generos: [],
    directores: [],
    productoras: [],
    tipos: []
  });

  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoadingForm(true);
      // Cargar listas para los selects
      const [resGeneros, resDirectores, resProductoras, resTipos] = await Promise.all([
        getGeneros(), getDirectores(), getProductoras(), getTipos()
      ]);

      // Filtrar solo activos (excepto para Tipos que no tienen estado segun el modelo)
      const activos = {
        generos: resGeneros.data.filter(g => g.estado === 'Activo'),
        directores: resDirectores.data.filter(d => d.estado === 'Activo'),
        productoras: resProductoras.data.filter(p => p.estado === 'Activo'),
        tipos: resTipos.data
      };

      setListas(activos);

      if (isEditing) {
        const { data } = await getMediaById(id);
        setFormData({
          serial: data.serial || '',
          titulo: data.titulo,
          sinopsis: data.sinopsis || '',
          url: data.url || '',
          imagen: data.imagen || '',
          anioEstreno: data.anioEstreno,
          generoPrincipal: data.generoPrincipal?._id || data.generoPrincipal || '',
          directorPrincipal: data.directorPrincipal?._id || data.directorPrincipal || '',
          productora: data.productora?._id || data.productora || '',
          tipo: data.tipo?._id || data.tipo || ''
        });
      } else {
        // Seleccionar el primero por defecto si las listas tienen elementos
        setFormData(prev => ({
          ...prev,
          generoPrincipal: activos.generos[0]?._id || '',
          directorPrincipal: activos.directores[0]?._id || '',
          productora: activos.productoras[0]?._id || '',
          tipo: activos.tipos[0]?._id || ''
        }));
      }
    } catch (err) {
      setError('Error al cargar datos necesarios');
      console.error(err);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (isEditing) {
        await updateMedia(id, formData);
      } else {
        await createMedia(formData);
      }
      navigate('/medias');
    } catch (err) {
      const msg = err.response?.data?.mensaje || err.response?.data?.message || 'Error al guardar la media';
      setError(msg);
      console.error(err);
      setLoading(false);
    }
  };

  if (loadingForm) {
    return <div className="p-8 text-center text-slate-500">Cargando formulario...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/medias" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEditing ? 'Editar Contenido' : 'Nuevo Contenido'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {error && (
          <div className="m-6 p-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-sm w-full md:w-auto md:mx-6 md:mb-0">
            {error}
          </div>
        )}

        {/* Vista previa de imagen */}
        <div className="w-full md:w-1/3 bg-slate-50 p-6 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-4 w-full">Vista previa Portada</p>
          <div className="w-full flex-1 min-h-[300px] border-2 border-dashed border-slate-300 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm">
            {formData.imagen ? (
               <img 
               src={formData.imagen} 
               alt="Vista previa" 
               className="w-full h-full object-cover"
               onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Error+en+Imagen'; }}
             />
            ) : (
              <span className="text-slate-400 text-sm p-4 text-center">La URL de la imagen se mostrará aquí</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Solo en modo edición: campos de solo lectura */}
            {isEditing && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Serial Único
                  </label>
                  <input
                    type="text"
                    value={formData.serial}
                    disabled
                    className="w-full p-2.5 border rounded-lg focus:outline-none transition-shadow bg-slate-100 border-slate-200 text-slate-500 font-mono text-sm cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    URL Generada
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    disabled
                    className="w-full p-2.5 border rounded-lg focus:outline-none transition-shadow bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-slate-700 mb-1">
                Título <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
                placeholder="Ej. Interstellar"
              />
            </div>

            <div>
              <label htmlFor="imagen" className="block text-sm font-medium text-slate-700 mb-1">
                URL de Imagen / Portada
              </label>
              <input
                type="url"
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="anioEstreno" className="block text-sm font-medium text-slate-700 mb-1">
                Año de Estreno <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                id="anioEstreno"
                name="anioEstreno"
                value={formData.anioEstreno}
                onChange={handleChange}
                required
                max={new Date().getFullYear()}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="sinopsis" className="block text-sm font-medium text-slate-700 mb-1">
                Sinopsis
              </label>
              <textarea
                id="sinopsis"
                name="sinopsis"
                value={formData.sinopsis}
                onChange={handleChange}
                rows="3"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow resize-none"
                placeholder="Breve resumen de la trama..."
              ></textarea>
            </div>

            {/* Selects Relacionales */}
            <div>
              <label htmlFor="generoPrincipal" className="block text-sm font-medium text-slate-700 mb-1">
                Género Principal <span className="text-rose-500">*</span>
              </label>
              <select
                id="generoPrincipal"
                name="generoPrincipal"
                value={formData.generoPrincipal}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow bg-white"
              >
                <option value="" disabled>Seleccione un género</option>
                {listas.generos.map((g) => (
                  <option key={g._id} value={g._id}>{g.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="directorPrincipal" className="block text-sm font-medium text-slate-700 mb-1">
                Director Principal <span className="text-rose-500">*</span>
              </label>
              <select
                id="directorPrincipal"
                name="directorPrincipal"
                value={formData.directorPrincipal}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow bg-white"
              >
                <option value="" disabled>Seleccione un director</option>
                {listas.directores.map((d) => (
                  <option key={d._id} value={d._id}>{d.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="productora" className="block text-sm font-medium text-slate-700 mb-1">
                Productora <span className="text-rose-500">*</span>
              </label>
              <select
                id="productora"
                name="productora"
                value={formData.productora}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow bg-white"
              >
                <option value="" disabled>Seleccione una productora</option>
                {listas.productoras.map((p) => (
                  <option key={p._id} value={p._id}>{p.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-slate-700 mb-1">
                Tipo <span className="text-rose-500">*</span>
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow bg-white"
              >
                <option value="" disabled>Seleccione un tipo</option>
                {listas.tipos.map((t) => (
                  <option key={t._id} value={t._id}>{t.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
            <Link
              to="/medias"
              className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Guardando...' : 'Guardar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
