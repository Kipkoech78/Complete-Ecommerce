

const express = require('express');

const {registerUser, loginUser, logout, authMiddleware} = require('../../conroller/auth/auth-controller');
const { handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProducts } = require('../../conroller/auth/admin/productsControlers');
const { upload } = require('../../helpers/claudinary');
const { filteredProducts, fetchProductById } = require('../../conroller/shop/product-controller');
const { addToCart, fetchCartItems, UpdateCartItem, DeleteCarttems } = require('../../conroller/cart-controller/cartController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message : "Authenticated User!",
        user
    });
});

router.post('/upload-image',upload.single('my_file') ,handleImageUpload)
router.get('/get-all', fetchAllProducts)
router.post('/add', addProduct)
router.put('/edit/:id', editProduct )
router.delete('/delete/:id',deleteProduct )
//products filtered Products
router.get('/getfiltered', filteredProducts)
router.get('/get/:id', fetchProductById)
//cart Routes
router.post('/addcart/', addToCart)
router.get('/cart/get/:userId', fetchCartItems)
router.put('/cart/update', UpdateCartItem)
router.delete('/cart/:userId/:productId', DeleteCarttems)


module.exports = router;