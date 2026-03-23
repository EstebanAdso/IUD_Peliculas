import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGeneros, deleteGenero } from '../../services/generoService';
import { Edit, Trash2, Plus, Tag } from 'lucide-react';

export default function GeneroList() {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGeneros();
  }, []);

  const loadGeneros = async () => {
    try {
      setLoading(true);
      const { data } = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.error('Error al cargar géneros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este género?')) {
      try {
        await deleteGenero(id);
        loadGeneros();
      } catch (error) {
        console.error('Error al eliminar género:', error);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Tag className="w-8 h-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-slate-800">Géneros</h1>
        </div>
        <Link 
          to="/generos/nuevo" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Género</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Cargando...</div>
        ) : generos.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No hay géneros registrados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-medium text-sm">
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 hidden md:table-cell">Descripción</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {generos.map((genero) => (
                  <tr key={genero._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{genero.nombre}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        genero.estado === 'Activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {genero.estado}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell text-slate-500 truncate max-w-xs" title={genero.descripcion}>
                      {genero.descripcion || '-'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/generos/editar/${genero._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(genero._id)}
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
