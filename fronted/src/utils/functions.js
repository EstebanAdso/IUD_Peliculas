// Permite formatear fechas ISO a un formato legible en español colombiano
export const formatDate = (isoDate) => {
  if (!isoDate) return 'N/A';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'N/A';

  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

// Construye un mapa de ID a nombre para géneros, directores, productoras y tipos
export const buildNameMap = (items) => {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    if (item?._id) {
      acc[item._id] = item.nombre || item.titulo || item._id;
    }
    return acc;
  }, {});
};