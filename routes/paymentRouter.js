const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)

router.route('/detailPayment/:id')
    .get(paymentCtrl.getDetailPayment)
    .delete(paymentCtrl.deletePayment)
    .put(paymentCtrl.updatePayment)


module.exports = router
