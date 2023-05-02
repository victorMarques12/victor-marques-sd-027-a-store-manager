const express = require('express');
const salesControler = require('../controllers/salesController');
const { validarQuantity, validarId } = require('../middlewares/validaSales');

const router = express();

router.get('/', salesControler.listaSales);
router.get('/:id', salesControler.getSalesId);
router.delete('/:id', salesControler.remove);
router.put('/:id', validarId, validarQuantity, salesControler.update);
/* router.post('/', validarQuantity, validarId, salesControler.criarSale); */

module.exports = router;