const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    gender:{
        type: String,
        default:"",
    },
    birthday:{
        type: String,
        default:""
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    phone:{
        type: String,
        default:""
    },
    addressName:{
        type: String,
        default:""
    },
    city:{
        type: String,
        default:""
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)