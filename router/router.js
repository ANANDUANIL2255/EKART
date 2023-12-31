const express=require('express')
const { adminLogin, addProduct, getProducts, editProduct,deleteProduct, getsingleProduct, usersSignUp, 
        userLogin, addToCart, cartCount, cartItems, totalPrice, QuantityIncrement, QuantityDecrement, 
        removeCart, addWishlist, wishlistItems, removeWishlist, getUsers, deleteUser } = require('../controller/logic')

// router object
const router=new express.Router()

router.post('/admin/login',adminLogin)
router.post('/admin/add-product',addProduct)
router.get('/product-access',getProducts)
router.put('/product-update/:id',editProduct)
router.delete('/product-delete/:id',deleteProduct)
router.get('/one-product/:id',getsingleProduct)
router.post('/user-signup',usersSignUp)
router.post('/user-login',userLogin)
router.post('/addtocart',addToCart)
router.get('/cart-count/:userId',cartCount)
router.get('/cart-items/:userId',cartItems)
router.get('/price-total/:userId',totalPrice)
router.get('/quantity-update-inc/:_id',QuantityIncrement)
router.get('/quantity-update-dec/:_id',QuantityDecrement)
router.delete('/remove-cart/:_id',removeCart)
router.post('/addtowishlist',addWishlist)
router.get('/wishlist-items/:userId',wishlistItems)
router.delete('/remove-wishlist/:_id',removeWishlist)
router.get('/user-access',getUsers)
router.delete('/user-delete/:_id',deleteUser)





// export 
module.exports=router
