const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        default: {}
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Number,
        default: 0
    },
    state:{
        type: Object,
    },
    total:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)