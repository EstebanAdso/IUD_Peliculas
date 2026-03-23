import { useState, useEffect } from 'react';
import { Film, User, Building, Tag, Clapperboard, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importamos los servicios para contar
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';
import { getMedias } from '../services/mediaService';

export default function Home() {
  const [counts, setCounts] = useState({
    generos: 0,
    directores: 0,
    productoras: 0,
    tipos: 0,
    medias: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [genRes, dirRes, prodRes, tipRes, medRes] = await Promise.all([
          getGeneros(),
          getDirectores(),
          getProductoras(),
          getTipos(),
          getMedias()
        ]);

        setCounts({
          generos: genRes.data.length,
          directores: dirRes.data.length,
          productoras: prodRes.data.length,
          tipos: tipRes.data.length,
          medias: medRes.data.length
        });
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { 
      name: 'Media Registrada', 
      value: counts.medias, 
      icon: <Film className="w-10 h-10 text-rose-500" />, 
      bg: 'bg-rose-50', 
      border: 'border-rose-100',
      link: '/medias',
      desc: 'Películas y series en catálogo'
    },
    { 
      name: 'Géneros', 
      value: counts.generos, 
      icon: <Tag className="w-10 h-10 text-indigo-500" />, 
      bg: 'bg-indigo-50', 
      border: 'border-indigo-100',
      link: '/generos',
      desc: 'Categorías temáticas'
    },
    { 
      name: 'Directores', 
      value: counts.directores, 
      icon: <User className="w-10 h-10 text-emerald-500" />, 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-100',
      link: '/directores',
      desc: 'Cineastas registrados'
    },
    { 
      name: 'Productoras', 
      value: counts.productoras, 
      icon: <Building className="w-10 h-10 text-amber-500" />, 
      bg: 'bg-amber-50', 
      border: 'border-amber-100',
      link: '/productoras',
      desc: 'Estudios de producción'
    },
    { 
      name: 'Tipos', 
      value: counts.tipos, 
      icon: <Clapperboard className="w-10 h-10 text-blue-500" />, 
      bg: 'bg-blue-50', 
      border: 'border-blue-100',
      link: '/tipos',
      desc: 'Formatos de visualización'
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-10 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Panel de Administración</h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Bienvenido al sistema unificado de gestión de catálogo. Aquí tienes una visión general de todo tu contenido en tiempo real.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-full">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Estado del Sistema</p>
              <p className="text-emerald-400 font-bold">Óptimo & En Línea</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Stats Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          Resumen de Métricas
          {loading && <span className="text-sm font-normal text-slate-400 animate-pulse ml-2">(Sincronizando...)</span>}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <Link 
              to={stat.link} 
              key={stat.name} 
              className={`group flex flex-col bg-white rounded-2xl p-6 shadow-sm border ${stat.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-slate-100 transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                </div>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-4xl font-extrabold text-slate-800 mb-1">
                  {loading ? '-' : stat.value}
                </h3>
                <p className="text-sm font-bold text-slate-600">{stat.name}</p>
                <p className="text-xs text-slate-400 mt-2">{stat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
