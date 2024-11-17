import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteCarttems, UpdateCartItem } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
function UserCartItemsContent({ cartItem }) {
  console.log("cart Item in wrapper " , cartItem)
  // cartItem = cartItem || []
  console.log("wrapp content", cartItem)
  const dispactch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {toast} = useToast()
  function handleCartItemDelete(getCartItem){
    dispactch(DeleteCarttems({userId: user?.id, productId: getCartItem?.productId}) )
    .then((data) =>{
      if(data?.payload?.success){
        toast({
          title:'deleted success',
          description:`${getCartItem?.title} deleted Successsfuly`
        })
      }
    })
  }
  function handleUpdateQuantity(getcartItem, typeOfAction){
    dispactch( UpdateCartItem({userId : user?.id, productId: getcartItem?.productId, quantity : 
      typeOfAction === "plus" ?
      getcartItem?.quantity +1 : getcartItem?.quantity -1

    })).then((data) => {
      if(data?.payload?.success){
        toast({
          title: " Cart Item Update",
          description: "Product quantity is updated successfuly"
        })
      }
    })
    
  }
  return (
    <div className='flex items-center space-x-4'>
        <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className='flex-1 items-center justify-between' >
       <h3 className='font-extrabold' > {cartItem.title}</h3>
       <div className='flex  item-center gap-5  mt-1' > 
       <Button onClick={()=>handleUpdateQuantity(cartItem, 'minus')}
        size="icon" 
        disabled={cartItem?.quantity === 1}
       className='h-8 shadow-md w-8 rounded-full'
        variant = 'outlined' > 
       <Minus className='h-4 w-4'/>
       <span className='sr-only'>Decrease</span>
       </Button>
       <span className='font-semibold' >{cartItem?.quantity} </span>
       <Button  onClick={()=>handleUpdateQuantity(cartItem, 'plus')}
       disabled={cartItem?.quantity === 20}
        size="icon" className='h-8 shadow-md w-8 rounded-full'
         variant = 'outlined' > 
       <Plus className='h-4 w-4'/>
       <span className='sr-only'>Increase</span>
       </Button>
        </div>
      </div>
      <div className='flex flex-col items-end' >
      <p className='font-semibold' >{( (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price )
       * cartItem?.quantity ).toFixed(2)} </p>
       <Trash onClick={()=> handleCartItemDelete(cartItem)} className='cursor-pointer  mt-1' size={20} />

      </div>
    </div>
  )
}

export default UserCartItemsContent