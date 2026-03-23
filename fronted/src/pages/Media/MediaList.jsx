import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedias, deleteMedia } from '../../services/mediaService';
import { Edit, Trash2, Plus, Film, ExternalLink, PlayCircle } from 'lucide-react';

export default function MediaList() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedias();
  }, []);

  const loadMedias = async () => {
    try {
      setLoading(true);
      const { data } = await getMedias();
      setMedias(data);
    } catch (error) {
      console.error('Error al cargar medias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este contenido?')) {
      try {
        await deleteMedia(id);
        loadMedias();
      } catch (error) {
        console.error('Error al eliminar media:', error);
      }
    }
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 p-2.5 rounded-xl">
            <Film className="w-7 h-7 text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Catálogo de Contenido</h1>
            <p className="text-sm text-slate-500">Administra todas tus películas y series</p>
          </div>
        </div>
        <Link 
          to="/medias/nuevo" 
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-md shadow-rose-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Nuevo Contenido</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-white rounded-2xl shadow-sm border border-slate-100 h-[450px] animate-pulse">
               <div className="h-[280px] bg-slate-200 rounded-t-2xl"></div>
               <div className="p-4 space-y-3">
                 <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                 <div className="flex gap-2"><div className="h-5 bg-slate-200 rounded w-16"></div><div className="h-5 bg-slate-200 rounded w-16"></div></div>
                 <div className="h-4 bg-slate-200 rounded w-full mt-4"></div>
                 <div className="h-4 bg-slate-200 rounded w-2/3"></div>
               </div>
            </div>
          ))}
        </div>
      ) : medias.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Film className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">El catálogo está vacío</h3>
          <p className="text-slate-500 mb-6">Aún no has registrado ninguna película o serie.</p>
          <Link to="/medias/nuevo" className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 px-5 py-2.5 rounded-xl font-medium transition-colors">
            <Plus className="w-5 h-5" /> Agregar mi primer contenido
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {medias.map((media) => (
            <div key={media._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 overflow-hidden flex flex-col transition-all duration-300">
              
              {/* Imagen de Portada */}
              <div className="relative aspect-[2/3] w-full bg-slate-800 overflow-hidden">
                {media.imagen ? (
                   <img 
                   src={media.imagen} 
                   alt={media.titulo} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                   onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=No+Cover'; }}
                 />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-100">
                    <Film className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-sm font-medium">Sin Portada</span>
                  </div>
                )}
                
                {/* Overlay Play Button */}
                <a href={media.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <PlayCircle className="w-16 h-16 text-white opacity-90 hover:scale-110 transition-transform drop-shadow-lg" />
                </a>

                {/* Año Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2 py-1.5 rounded-lg shadow-sm">
                  {media.anioEstreno}
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-800 leading-tight line-clamp-1 mb-2" title={media.titulo}>
                  {media.titulo}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[11px] font-bold tracking-wide uppercase bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">
                    {media.generoPrincipal?.nombre || 'Sin Género'}
                  </span>
                  <span className="text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">
                    {media.tipo?.nombre || 'Sin Tipo'}
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">
                  {media.sinopsis || "No hay una sinopsis registrada para este título. Puedes agregar una editando el contenido."}
                </p>

                {/* Director y Productora (Opcional, para complementar) */}
                <div className="text-xs text-slate-400 mb-4 line-clamp-1">
                  <span className="font-medium">Dir:</span> {media.directorPrincipal?.nombre || 'N/A'} • <span className="font-medium">Prod:</span> {media.productora?.nombre || 'N/A'}
                </div>

                {/* Acciones Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="text-xs text-slate-400 font-mono">
                    ID: {media.serial.slice(0, 8)}
                  </div>
                  <div className="flex gap-1">
                    <Link 
                      to={`/medias/editar/${media._id}`} 
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar Contenido"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(media._id)} 
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Eliminar Contenido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
