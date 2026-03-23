# Backend - API RESTful de Películas y Series

Este proyecto corresponde a la capa de servicios (Backend) del sistema de catálogo audiovisual. Está construido usando tecnologías modernas de JavaScript orientadas al ecosistema del lado del servidor.

## 🚀 Tecnologías y Herramientas
- **Node.js**: Entorno de ejecución para el código de servidor.
- **Express.js**: Framework minimalista que facilita la creación de rutas, configuración de middlewares (como CORS) y gestión de peticiones HTTP.
- **MongoDB**: Base de datos NoSQL elegida por su flexibilidad.
- **Mongoose**: Modelado de objetos para MongoDB (ODM) que nos permite definir esquemas estrictos y validar datos antes de almacenarlos.
- **uuid**: Generación de seriales o identificadores únicos estandarizados en base a algoritmos robustos.
- **dotenv**: Gestión segura de variables de entorno y secretos del servidor estático.

## ⚙️ Estructura y Módulos
El proyecto expone los endpoints necesarios para realizar el flujo de un **CRUD completo** (Crear, Leer, Actualizar, Borrar) en cada una de las siguientes entidades:
- `Productora`
- `Director`
- `Género`
- `Tipo`
- `Media`

## 🛡️ Lógica de Negocio y Validaciones Estrictas
**Verificación de Dependencias (Foreign Keys):** 
Durante la creación o actualización de un registro de `Media` (nuestra clase más compleja, que representa una película o serie), el backend **no asume** que los datos recibidos están correctos de buenas a primeras.

Realizamos verificaciones estrictas (a través de nuestro utilitario `validarMedia`) para asegurarnos que:
1. El identificador del `Director`, `Productora`, `Género` y el `Tipo` existan física y realmente dentro de sus colecciones en MongoDB (`findById`).
2. Cada una de estas relaciones esté con un **Estado: "Activo"**. Si el administrador intentara asignar, por ejemplo, un Director en estado *Inactivo*, la API abortará la creación y arrojará un error informativo al cliente.
3. Se generen adecuadamente URLs e Imágenes por defecto en caso de no ser proporcionadas de forma explícita o se les asigne el serial único por medio de la librería `uuidv4()`.

## 📦 Inicialización Rápida
Ejecuta los siguientes comandos para iniciar la API en un entorno de desarrollo con Auto-recargas (`nodemon`):

```bash
cd backend
npm install
npm run dev
```
