const express = require('express');
const productController = require('../controllers/productController');
const { validacaoProduct } = require('../middlewares/validaProduct');

const router = express();

router.get('/', productController.listaProduct);
router.get('/:id', productController.getProdutoId);
router.post('/', validacaoProduct, productController.creteControler);
router.put('/:id', validacaoProduct, productController.update);
router.delete('/:id', productController.remove);

module.exports = router;