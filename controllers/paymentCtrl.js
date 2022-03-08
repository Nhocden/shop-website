const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, address, total} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, address, total
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            
            await newPayment.save()
            res.json(newPayment)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getDetailPayment: async(req, res) =>{
        try {
            const order = await Payments.findById(req.params.id)
            res.json(order)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePayment: async(req, res) =>{
        try {
            const order = await Payments.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Order success"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePayment: async(req, res) =>{
        try {
            const orderInfo = req.body.order
            console.log("orderInfo",req.body)
            const order = await Payments.findByIdAndUpdate(req.params.id, orderInfo)
            // console.log("order",order)
            res.json(order)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl
