import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductoras, deleteProductora } from '../../services/productoraService';
import { Edit, Trash2, Plus, Building } from 'lucide-react';

export default function ProductoraList() {
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductoras();
  }, []);

  const loadProductoras = async () => {
    try {
      setLoading(true);
      const { data } = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.error('Error al cargar productoras:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta productora?')) {
      try {
        await deleteProductora(id);
        loadProductoras();
      } catch (error) {
        console.error('Error al eliminar productora:', error);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Building className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-bold text-slate-800">Productoras</h1>
        </div>
        <Link 
          to="/productoras/nuevo" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Productora</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Cargando...</div>
        ) : productoras.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No hay productoras registradas.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-medium text-sm">
                  <th className="p-4">Nombre</th>
                  <th className="p-4 hidden md:table-cell">Slogan</th>
                  <th className="p-4 hidden lg:table-cell">Descripción</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productoras.map((productora) => (
                  <tr key={productora._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{productora.nombre}</td>
                    <td className="p-4 hidden md:table-cell text-slate-500 italic max-w-xs truncate" title={productora.slogan}>
                      {productora.slogan || '-'}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-slate-500 max-w-xs truncate" title={productora.descripcion}>
                      {productora.descripcion || '-'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        productora.estado === 'Activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {productora.estado}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/productoras/editar/${productora._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(productora._id)}
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
