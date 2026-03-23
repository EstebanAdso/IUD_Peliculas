require('dotenv').config();
const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url)
        console.log('🟢 Conexión a la base de datos establecida');
    } catch (error) {
        console.log('🔴 Error al conectar a la base de datos:', error);
    }
}

module.exports = {
    getConnection
}