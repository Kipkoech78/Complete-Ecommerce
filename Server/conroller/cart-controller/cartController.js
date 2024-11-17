const Cart = require("../../models/Cart")
const Products = require("../../models/Products")



const UpdateCartItem = async(req,res) => {
    try{
        const {userId, productId, quantity} = req.body
        if(!userId || !productId || quantity <= 0){
            return res.status(404).json({
                success: false,
                message: "Invalid:(updateCartItems) data Provided"
            })
        }
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart Item not  found"
            })
        }
        const findCurrentProductIndex =  cart.items.findIndex(item => item.productId.toString() === productId)
        if(findCurrentProductIndex === -1 ){
            res.status(404).json({
                success: false,
                message : "Cart Item not present"
            })
        }
        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save()
        await cart.populate({
            path: 'items.productId',
            select:'image title price salePrice '
        })
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId? item.productId._id : null,
            image : item.productId? item.productId.image : null,
            title : item.productId? item.productId.title: "Product not  found",
            price : item.productId? item.productId.price: null,
            salePrice: item.productId? item.productId.salePrice : null,
            quantity: item.quantity

        }))
        res.status(200).json({
            success: true,
            data : {
                ...cart._doc,
            items:populateCartItems
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message : "Error Occured adding to cart"
        })
    }
}

const addToCart = async(req,res) =>{
    try{
        const {userId, productId, quantity} = req.body
        if(!userId || !productId || quantity <= 0 ){
            return res.status(404).json({
                success: false,
                message: "Invalid data Provided"
            })
        }
        const product = await Products.findById(productId)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not   found"
            })
        }
        let cart = await Cart.findOne({userId})
        if(!cart){
            cart = new Cart({userId, items:[]})
        }
        const findCurrentProductIndex = cart.items.findIndex(item =>item.productId.toString() === productId);

        if(findCurrentProductIndex === -1){
            cart.items.push({productId, quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()
        res.status(200).json({
            success : true,
            message: "Product successfuly added to cart",
            data: cart
        })

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message : "Error Occured adding to cart",
            
        })
    }
};
const fetchCartItems = async(req,res) =>{
    try{
        const {userId} =  req.params
        if(!userId){
            return res.status(404).json({
                success: false,
                message: "userId is Required"
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select : "image title price salePrice"
        })
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }
        //Note: validate so in any case admin deletes it will not be available in cat also
        const validItem = cart.items.filter((productItem) =>productItem.productId);
        if(validItem.length < cart.items.length){
            cart.items = validItem;
            await  cart.save()
        }
        const populateCartItems = validItem.map((item) => ({
            productId: item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity

        }))
        res.status(200).json({
            success: true,
            message: "cart Items fetched successfully",
            data: {
                ...cart._doc,
            items:populateCartItems
            }
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message : "Error Occured Fetching cart"
        })
    }
}

const DeleteCarttems = async(req,res) =>{
    try{
        const {userId, productId} = req.params;
        if(!userId || !productId){
            return res.status(404).json({
                success: false,
                message: "Invalid data Provided"
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select: "image, title, price, salePrice"
        })
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }
        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
        await cart.save()
        await cart.populate({
            path:'items.productId',
            select: 'image title price salePrice'
        })
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId? item.productId._id : null,
            image : item.productId? item.productId.image : null,
            title : item.productId? item.productId.title: "Product not  found",
            price : item.productId? item.productId.price: null,
            salePrice: item.productId? item.productId.salePrice : null,
            quantity: item.quantity

        }))
        res.status(200).json({
            success: true,
            data:{
                ...cart._doc,
            items:populateCartItems
            }
        })
        

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message : "Error Occured Deleting cart"
        })
    }
}



module.exports = {
    addToCart,
    UpdateCartItem,
    DeleteCarttems,
    fetchCartItems
};