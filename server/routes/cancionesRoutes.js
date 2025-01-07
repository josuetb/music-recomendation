let express = require('express');
const router = express.Router();
let cancionController = require('../controller/cancionController');
const path = require('path');

router.post('/', cancionController.agregarCancion);
router.get('/aleatoria', cancionController.obtenerCancionAleatoria);
router.post('/:id/votar', cancionController.votarCancion);
router.get('/', cancionController.obtenerCanciones);
router.delete('/:id', cancionController.eliminarCancion);



module.exports = router;