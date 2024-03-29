const Products = require('../models/productModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getAllProducts: async(req, res) =>{
        try {
            const products = await Products.find()
            res.json(products)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProducts: async(req, res) =>{
        try {
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getDetailProducts: async(req, res) =>{
        try {
            const product = await Products.findById(req.params.id)
            res.json(product)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
            const {title, price, quantityOfProduct, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            
            const products = await Products.find()
            console.log("products length", products.length)
            console.log("vafo creare api")
            const newProduct = new Products({
                product_id:products.length, title: title.toLowerCase(), price, quantityOfProduct, description, content, images, category
            })

            await newProduct.save()
            console.log("newProduct",newProduct)
            res.json(newProduct)
            // res.json({msg: "Created a product"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {title, price, quantityOfProduct, pushlished, sold, description, content, images, category, comments} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const product = await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, quantityOfProduct, pushlished, sold, description, content, images, category, comments
            })

            res.json(product)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createComment: async(req, res) =>{
        try {
            const product = await Products.findOneAndUpdate({_id: req.params.id}, {
                comments: req.body.comments
            })
            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productCtrl