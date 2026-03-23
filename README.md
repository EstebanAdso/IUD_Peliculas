# Catálogo Audiovisual - Proyecto Monorepo (Frontend & Backend)

Bienvenido al repositorio unificado del **Catálogo Audiovisual**, un proyecto moderno construido en formato "Monorepo" donde tanto la interfaz gráfica (Frontend) como la lógica de servidor (Backend) residen dentro de este mismo lugar. 

Este proyecto te permite gestionar un inventario interactivo de Películas y Series, sus Directores, Productoras, Géneros y Tipos, garantizando la consistencia de la información.

## 📁 Estructura del Repositorio

El proyecto se divide de forma limpia en dos directorios principales. Entra a las carpetas (y lee sus respectivos `README.md`) para ver los detalles técnicos precisos de su funcionamiento interno, scripts de ejecución e instalación.

### 1. [📂 Backend](./backend/README.md)
La capa de lógica de negocio, validaciones y conexión a la base de datos MongoDB.
- **Node.js + Express.js + Mongoose**
- Administra un CRUD estricto con validaciones a nivel de esquema (Ej. verificar la integridad referencial y que un "Género" o "Director" estén en estado `"Activo"` antes de asociarlos a una película).
- API RESTful operando por defecto en `http://localhost:4000/`.

### 2. [📂 Frontend (Panel UI)](./fronted/README.md)
La capa de visualización e interacción de Usuario (SPA).
- **React.js (Vite) + Tailwind CSS + Axios**
- Componentes modulares, paneles elegantes tipo cuadrícula (Card Grids) e iconos profesionales (Lucide React).
- Bloques de código prearmados para asegurar una experiencia de usuario rápida, reactiva y fluida. 
- Servidor de desarrollo corriendo por defecto (usualmente `http://localhost:5173/`).

---

## 🚀 Cómo hacer funcionar todo el proyecto a la vez

Dado que son dos proyectos distintos dentro del mismo repositorio, debes inicializar ambos (se encenderán en distintos puertos o terminales). 

Para comenzar desde cero (por primera vez tras clonar), abre dos terminales separados en esta misma carpeta y ejecuta:

**Terminal 1 (Backend - Base de datos y API):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend - Aplicación React):**
```bash
cd fronted
npm install
npm run dev
```

> **¡Felicidades!** Con ambas terminales corriendo, solo debes abrir el enlace local de react (normalmente `http://localhost:5173`) en tu navegador para interactuar con tu catálogo audiovisual a nivel visual, enviando solicitudes directo a tu propio servidor backend activo.
