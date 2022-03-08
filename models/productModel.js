const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    rate:{
        type: Number,
        default: 5
    },
    pushlished:{
        type: Boolean,
        default: true
    },
    quantityOfProduct:{
        type: Number,
        default: 0
    },
    comments:{
        type: Object,
        default:[]
    },
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)