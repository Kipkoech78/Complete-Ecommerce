import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import { setProductDetails } from '@/store/shop/product-slice'




  
function ProductDetailsDialogue({open, setOpen, productDetails}) {
  console.log("items in details page ", productDetails)
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const {toast} = useToast()

  function handleAddtoCart(getCurentProductId){
    console.log("current product Id" ,getCurentProductId)
    dispatch(addToCart({ userId: user?.id, productId: getCurentProductId, quantity:1 }))
    .then(data => {
     // console.log("handleAdd to cart", data)
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
      }
      toast({
        variant:"success",
        title :" Success",
        description: "one Product successfully added to Cart "
      })
    })
  }
  function handleDialogClose(){
    setOpen(false)
    dispatch(setProductDetails())
  }

  return (
   <Dialog open = {open} onOpenChange={handleDialogClose} >
   <DialogContent className='grid, grid-cols-2 gap-8 sm:p-12 max-w-[100vw]  sm:max-w-[80vw] lg:max-w-[80vw] ' >
   <div className='relative overflow-hidden rounded-lg '>
   <img src = {productDetails?.image} alt ={productDetails?.title}
    width={700} height={700}
    className='aspect-square w-full object-cover'
   />
   </div>
   <div className='grid min-h-[500px]  gap-1' >
   <div className='max-h-[300px] ' >
   <h1 className='text-3xl font-extrabold' > {productDetails?.title} </h1>
   <p className='text-muted-foreground pt-5 min-h-{300px]  text-2xl mb-4' > {productDetails?.description.slice(0, 300)} </p>
   </div>
   <div className='flex items-center justify-between' >
   <p className={`${productDetails?.salePrice > 0 ? 'line-through ' :''} text-3xl font-bold text-primary ` }>Ksh: {productDetails?.salePrice}  </p>
   {
    productDetails?.price > 0 ? <p className='text-3xl font-bold text-primary' > Ksh : {productDetails?.price}  </p> : null
   }
   </div>

   <div className='flex items-center gap-2'>
   <div className='flex mt-2 items-center gap-1' > <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> </div>
   <span className='text-muted-foreground'>(3.5)</span>
   </div>
   <div className='mt-5 mb-5'>
    <Button onClick={()=> handleAddtoCart(productDetails?._id)} className='w-full' >
        Add to cart
    </Button>
   </div>
   <Separator  />
   <div className='max-h-[200px] overflow-auto ' >
   <h2 className='text-xl font-bold mb-4' >Reviews</h2>
   <div className='grid gap-3' >
   <div className='flex gap-6' >
    <Avatar className='w-10 h-10 border' >
        <AvatarFallback>SM</AvatarFallback>
       
    </Avatar>
    <div className='grid gap-1' > 
    <div className='flex items-center gap-2' > <h3>Sharon Mercy</h3> 
    </div>
    <div className='flex mt-2 items-center gap-1' > <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> </div>
    <p> product is cool</p>
    
     </div>
     
     
   </div>
   <div className='flex gap-5' >
    <Avatar className='w-10 h-10 border' >
        <AvatarFallback>BS</AvatarFallback>
       
    </Avatar>
    <div className='grid gap-1' > 
    <div className='flex items-center gap-2' > <h3>Bridget shan</h3> 
    </div>
    <div className='flex mt-2 items-center gap-1' > <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> </div>
    <p> product is awesome</p>
    
     </div>
   </div>
   <div className='flex gap-5' >
    <Avatar className='w-10 h-10 border' >
        <AvatarFallback>DS</AvatarFallback>
       
    </Avatar>
    <div className='grid gap-1' > 
    <div className='flex items-center gap-2' > <h3>Dennis Sang</h3> 
    </div>
    <div className='flex mt-2 items-center gap-1' > <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> <StarIcon className='w-5 h-5 fill-yellow-600' /> </div>
    <p>An image element with a fallback for representing the user.</p>
    
     </div>
   </div>
   </div>
   </div>
   
   <div className='mt-6 min-h-[100px] max-h-[200px] flex gap-2'>
    <Input className='shadow-lg' placeholder='write a review...' />
    <Button>
        Submit
    </Button>
   </div>
 
   </div>
   <DialogDescription> @all right served </DialogDescription>
  
   </DialogContent>
   </Dialog>
  )
}
export default ProductDetailsDialogue