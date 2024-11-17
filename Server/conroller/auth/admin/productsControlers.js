const { ImageUploadUtils } = require("../../../helpers/claudinary");
const Products = require("../../../models/Products");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;

        let result;
        let attempts = 0;
        const maxAttempts = 3;

        // Retry logic for image upload
        while (attempts < maxAttempts) {
            try {
                result = await ImageUploadUtils(url);
                console.log("Uploaded successfuly")
                break; // If upload succeeds, exit the loop
            } catch (err) {
                attempts++;
                if (attempts === maxAttempts) {
                    throw new Error('Failed to upload image after multiple attempts');
                }
                console.log(`Retrying upload attempt ${attempts}...`);
            }
        }

        res.json({
            success: true,
            message: "Image uploaded successfully",
            result
        });
    } catch (err) {
        console.log("Cloudinary Errors", err);
        res.json({
            success: false,
            message: "Error occurred -> image upload async",
        });
    }
};
// add a product
const addProduct = async(req, res)=>{
    try{
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body
        const newProduct = new Products({
            image, title, description, category, brand, price, salePrice, totalStock
        })
        await  newProduct.save()
        res.status(201).json({
            success : true,
            message: "Product saved Successfuly"
        })

    }catch(err){
        console.log(err)
        res.json({
            success: false,
            message:"Error Occured,in Add product "
        })

    }
}


//fetch all products
const fetchAllProducts = async(req, res) =>{
    try{
        const listOfProducts =await Products.find({});
        res.status(200).json({
            success: true,
            message: "Product list fetched Successfuly",
            data : listOfProducts
        })


    }catch(err){
        console.log(err)
        res.json({
            succcess: false,
            message: "error Occured Fetching Products"
        })
    }
}
// edit products
const editProduct = async(req, res) =>{
    try{
         const {id} = req.params
         const {image, title, description, category, brand, price, salePrice, totalStock} = req.body
        let findProductById = await Products.findById(id)
        if(!findProductById){
            res.status(404).json({
                success: false,
                message: "Product not Found"
             })    
        }
        findProductById.title = title || findProductById.title
        findProductById.description = description || findProductById.description
        findProductById.brand = brand || findProductById.brand
        findProductById.category = category || findProductById.category
        findProductById.price = price === '' ? 0 : price || findProductById.price
        findProductById.salePrice = salePrice === "" ? 0 : salePrice || findProductById.salePrice
        findProductById.totalStock = totalStock || findProductById.totalStock
        findProductById.image = image || findProductById.image

        await findProductById.save()
        res.status(201).json({
            success: true,
            message: "Product edited successful",
            data: findProductById
        })
    }catch(err){
        console.log(err)
        res.json({
            success: false,
            message: "Error Occured aditing Products"
        })
    }
}
//delete product
const deleteProduct = async(req, res) =>{
    try{
        const { id } = req.params
        const product = await Products.findByIdAndDelete(id)
   
        if(!product){
            
            res.status(404).json({
                success: false,
                message: "Product not found",

            })
        } else{
            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            })
        }
      

    }catch(e){
        console.log(e)
        res.json({
            success: false,
            message:'Error Deleting Product'
        })
    }
}
module.exports = { handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProducts };
