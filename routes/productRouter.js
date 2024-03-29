const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)

router.get('/allproducts', productCtrl.getAllProducts)


router.route('/products/:id')
    .get(productCtrl.getDetailProducts)
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)

router.route('/products/comment/:id')
    .patch(auth, productCtrl.createComment)



module.exports = router