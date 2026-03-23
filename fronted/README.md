# Frontend - Panel de Administración Audiovisual

Bienvenido al lado visual del proyecto, una aplicación de una sola página (SPA) que sirve de interfaz para interactuar directamente con el sistema de inventario audiovisual (Películas/Series).

## 🎨 Aspectos Destacados
- **Diseño enfocado al Usuario**: Moderno panel rico en componentes, uso extensivo de "Card Grids" para el Media y "Badges" dinámicos en vez de tradicionales y aburridas tablas de texto llanas.
- **Experiencia de Usuario (UX)**: Efectos hover sobre posters (botón *Play* en semitransparencia), previsualización de URLs en vivo (imágenes en estado roto que automáticamente muestran una imagen alternativa), recortes de "Sinopsis" e iconos unificados.
- **Validaciones UX**: Si bien el backend gestiona la base del negocio, los formularios del Frontend están conectados dinámicamente: solo se le muestra al usuario directores o géneros **Activos**, facilitándole la operación de creación sin estrés.

## 🚀 Tecnologías y Herramientas
- **React 18**: Librería de UI altamente popular, construida de forma funcional basada en Hooks para gestionar los ciclos de vida y estados a través de componentes (`useState`, `useEffect`).
- **Tailwind CSS**: Framework avanzado de CSS de utilidad (Utility-first) que usamos para dar estilos modernos, transiciones (`animate-fade-in`), responsividad (`md:grid-cols-2`) de una manera rápida y directa en el JSX.
- **React Router Dom**: Enrutado de las páginas para comportarse como una verdadera Single Page Application (el navegador no recarga completamente cuando te cambias al panel del "Director" o a la "Productora").
- **Axios**: Cliente HTTP por excelencia basado en promesas. Se estructuró en una capa de servicios de tal manera que toda conexión a la base de datos se exporta de forma limpia y mantenible.
- **Lucide React**: Una colección premium y minimalista de iconografía de alta calidad.

## 🌐 Estructura
```text
/src
 ├── /components   --> Componentes compartidos globales, como el layout de Sidebar (menú de navegación) interactivo.
 ├── /pages        --> Vistas lógicas (Director, Genero, Media, etc), agrupadas cada una por Listas y Formularios.
 ├── /services     --> Lógica de red y llamadas endpoints via axiosConfig.
 └── App.jsx       --> Enrutador principal.
```

## 📦 Inicialización Rápida
Ejecuta el servidor con carga rápida de React por Vite:

```bash
cd fronted
npm install
npm run dev
```
