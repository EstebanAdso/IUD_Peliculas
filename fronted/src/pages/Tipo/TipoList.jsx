import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTipos, deleteTipo } from '../../services/tipoService';
import { Edit, Trash2, Plus, Clapperboard } from 'lucide-react';

export default function TipoList() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    try {
      setLoading(true);
      const { data } = await getTipos();
      setTipos(data);
    } catch (error) {
      console.error('Error al cargar tipos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este tipo?')) {
      try {
        await deleteTipo(id);
        loadTipos();
      } catch (error) {
        console.error('Error al eliminar tipo:', error);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-800">Tipos de Media</h1>
        </div>
        <Link 
          to="/tipos/nuevo" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Tipo</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Cargando...</div>
        ) : tipos.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No hay tipos registrados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-medium text-sm">
                  <th className="p-4">Nombre</th>
                  <th className="p-4 hidden md:table-cell">Descripción</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map((tipo) => (
                  <tr key={tipo._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-md text-sm">
                        {tipo.nombre}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell text-slate-500 truncate max-w-sm" title={tipo.descripcion}>
                      {tipo.descripcion || '-'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/tipos/editar/${tipo._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(tipo._id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
