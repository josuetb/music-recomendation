let mongoose = require('mongoose');
let cancionShema = new mongoose.Schema({
    nombre: {type: String, required: true},
    artista: {type: String, required: true},
    url_video: {type: String, required: true},
    votos: {type: Number, default: 0}, 
}, { collection: 'canciones' });

let Cancion = new mongoose.model('Cancion', cancionShema);

module.exports = Cancion;