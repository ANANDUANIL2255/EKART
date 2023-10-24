const { admins, products, users, carts, wishlists } = require("../models/collections");

// logic
const adminLogin=(req,res)=>{
    const {uname,psw}=req.body
    admins.findOne({uname,psw}).then(user=>{
        if(user){
            res.status(200).json({
                message:"login success",
                statusCode:200,
                status:true
            })
        }
        else{
            res.status(404).json({
                message:"login details incorrect",
                statusCode:404,
                status:false
            })
             
        }
    })
}

const addProduct=(req,res)=>{
    const {pname,description,price,image,rating,count}=req.body
    const newProduct=new products({
        pname,description,price,image,rating,count
        
    })
    newProduct.save()
    res.status(200).json({
        message:"new product added",
        statusCode:200,
        status:true
    })
}

const getProducts=(req,res)=>{
    products.find().then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                statusCode:200,
                status:true
            })
        }
    })
}

const editProduct=(req,res)=>{
    const {id}=req.params
    const { pname,description,price,image,rating,count}=req.body
    products.findOne({_id:id}).then(pdata=>{
        if(pdata){
            pdata.pname=pname
            pdata.description=description
            pdata.price=price
            pdata.image=image
            pdata.rating=rating
            pdata.count=count

            pdata.save()
            res.status(200).json({
                message:"product updated",
                statusCode:200,
                status:true
            })
        }
    })
}

const deleteProduct=(req,res)=>{
  const {id}=req.params
  products.deleteOne({_id:id}).then(data=>{
    res.status(200).json({
        message:"product deleted",
        statusCode:200,
        status:true
    })
  })
}

const getsingleProduct=(req,res)=>{
    const {id}=req.params
    products.findOne({_id:id}).then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                statusCode:200,
                status:true
            })
        }
        else{
            res.status(404).json({
                message:"no data",
                statusCode:404,
                status:false
            })
        }
    })

  
}

const usersSignUp=(req,res)=>{
    const {email,psw}=req.body
    users.findOne({email}).then(user=>{
      if(user){
        res.status(404).json({
            message:"already exist",
            statusCode:404,
            status:false
        })
      }
      else{
        newUser=new users({
            email,psw
        })
        newUser.save()
        res.status(200).json({
            message:"registered successfully",
            statusCode:200,
            status:true
        })
      }
    })
   } 

   const userLogin=(req,res)=>{
    const {email,psw}=req.body
    users.findOne({email,psw}).then(user=>{
        if(user){
            res.status(200).json({
                message:"login success",
                statusCode:200,
                _id:user._id,
                status:true
            })
        }
        else{
            res.status(404).json({
                message:"incorrect password or email ",
                statusCode:404,
                status:false
            })
        }
    })
   }
   
   const addToCart=(req,res)=>{
    const {userId,pId}=req.body

    carts.findOne({userId,pId}).then(data=>{
        if (data){
            data.quantity+=1
            data.totalPrice=data.quantity*data.price
            data.save()
            res.status(200).json({
                message:"product added to cart",
                statusCode:200,
                status:true
            })
        }
        else{
            products.findOne({_id:pId}).then(product=>{
                if(product){
                    newCart=new carts({
                        userId,
                        pId,
                        pname:product.pname,
                        description:product.description,
                        price:product.price,
                        image:product.image,
                        rating:product.rating,
                        quantity:1,
                        totalPrice:product.price
                        
                    })
                    newCart.save()
                    res.status(200).json({
                        message:"product added",
                        statusCode:200,
                        status:true
                    })
                }
            })
        }
    })


   }

     const cartCount=(req,res)=>{
        const {userId}=req.params
        carts.find({userId}).then(products=>{
            if(products){
                res.status(200).json({
                    message:products.length,
                    statusCode:200,
                    status:true
                })
            }
        })
     }

     const cartItems=(req,res)=>{
        const {userId}=req.params
        carts.find({userId}).then(products=>{
            if(products){
                res.status(200).json({
                    message:products,
                    statusCode:200,
                    status:true
                })
            }
        })
     }

     const totalPrice=(req,res)=>{
        const {userId}=req.params
        carts.find({userId}).then(products=>{
            if(products){
                if(products.length > 0){
                    total=products.map(i=>i.totalPrice).reduce((i1,i2)=>i1+i2)
                    res.status(200).json({
                        message:total,
                        statusCode:200,
                        status:true
                    })
                }
            }
        })
     }

    const QuantityIncrement=(req,res)=>{
        const {_id}=req.params
        carts.findOne({_id}).then(data=>{
            if(data){
                data.quantity +=1
                data.totalPrice=data.price*data.quantity
                data.save()
                res.status(200).json({
                    message:data.quantity,
                    statusCode:200,
                    status:true,
                    price:data.totalPrice
                })
            }
        })
    }

    const QuantityDecrement=(req,res)=>{
        const{_id}=req.params
        carts.findOne({_id}).then(data=>{
            if(data){
                if(data.quantity > 1){
                    data.quantity -=1
                    data.totalPrice=data.price*data.quantity

                    data.save()
                    res.status(200).json({
                        message:data.quantity,
                        statusCode:200,
                        status:true,
                        price:data.totalPrice
                    })
                }
                else{
                    res.status(404).json({
                        message:"you can remove this from cart",
                        statusCode:404,
                        status:false
                    })
                }
            }
        })
    }

    const removeCart=(req,res)=>{
        const{_id}=req.params
        carts.deleteOne({_id}).then(data=>{
            res.status(200).json({
                message:"product removed from cart",
                statusCode:200,
                status:true
            })
        })
    }

    const addWishlist=(req,res)=>{
        const {userId,pId}=req.body
    
        wishlists.findOne({userId,pId}).then(data=>{
            if (data){
                
                res.status(400).json({
                    message:"product already added ",
                    statusCode:400,
                    status:false
                })
            }
            else{
                products.findOne({_id:pId}).then(product=>{
                    if(product){
                        newWishlist=new wishlists({
                            userId,
                            pId,
                            pname:product.pname,
                            description:product.description,
                            price:product.price,
                            image:product.image,
                            rating:product.rating
                            
                            
                        })
                        newWishlist.save()
                        res.status(200).json({
                            message:"product added to wishlist",
                            statusCode:200,
                            status:true
                        })
                    }
                })
            }
        })
    
    
       }

       const wishlistItems=(req,res)=>{
        const {userId}=req.params
        wishlists.find({userId}).then(products=>{
            if(products){
                res.status(200).json({
                    message:products,
                    statusCode:200,
                    status:true
                })
            }
        })
     }

     const removeWishlist=(req,res)=>{
        const{_id}=req.params
        wishlists.deleteOne({_id}).then(data=>{
            res.status(200).json({
                message:"product removed from wishlist",
                statusCode:200,
                status:true
            })
        })
    }

    const getUsers=(req,res)=>{
        users.find().then(data=>{
            if(data){
                res.status(200).json({
                    message:data,
                    statusCode:200,
                    status:true
                })
            }
        })
    }

    const deleteUser=(req,res)=>{
        const {_id}=req.params
        users.deleteOne({_id}).then(data=>{
            carts.deleteMany({userId:_id}).then(data=>{
                wishlists.deleteMany({userId:_id}).then(data=>{
                    res.status(200).json({
                        message:"product deleted",
                        statusCode:200,
                        status:true
                    })
                })
            })
         
        })
      }
    






module.exports={adminLogin,addProduct,getProducts,editProduct,deleteProduct,getsingleProduct,usersSignUp,userLogin,addToCart,
               cartCount,cartItems,totalPrice,QuantityDecrement,QuantityIncrement,removeCart,addWishlist,wishlistItems,
               removeWishlist,getUsers,deleteUser}