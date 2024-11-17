const Products = require("../../models/Products")



const filteredProducts = async(req, res)=>{
    try{
        const {category = [], brand= [], sortBy = "price-lowtohigh"} = req.query;
        let filters = {};
        if(category.length){
            filters.category = {$in: category.split(',')}
        }
        if(brand.length){
            filters.brand = {$in: category.split(',')}
        }
        let sort = {}
        switch (sortBy){
            case 'price-lowtohigh' :
                sort.price = 1

            break;
            case "price-hightolow" :
                sort.price = -1
                
            break;
            case 'title-atoz' :
                sort.title = 1
                
            break;
            case 'title-ztoa':
                sort.title = -1
                
            break;

            default:
                sort.price = 1
            break;

        }
        const product = await Products.find(filters).sort(sort)
        res.status(200).json({
            success: true,
            message:"Product fetched filtered successfuly",
            data: product

        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message:"Error occured filtering products"
        })
    }
}
const fetchProductById = async(req,res)=>{
    try{
        const {id}  = req.params
        const product = await Products.findById(id)
        if(!product){
            res.status(404).json({
                success: false,
                message: "Product Not Found!"
            })
        }
        res.status(200).json({
            success: true,
            message : "Product fetched successfully",
            data : product
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            sucess: false,
            message: "error getting product"
        })
    }
}
module.exports ={filteredProducts, fetchProductById}