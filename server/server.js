let express = require('express');
let mongoose = require('mongoose');
let cancionesRoutes = require('./routes/cancionesRoutes');
let app = express();
let PORT = 3000;
const path = require('path');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/canciones', cancionesRoutes);

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('*', (req, res) => {
  res.status(404).send("Página no encontrada");
});

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/music');
        console.log("Conexión exitosa a la base de datos.");
    } catch (err) {
        console.error("Error en la conexión (base de datos):", err);
        process.exit(1);
    }
}

connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});