import React from 'react'
import { Button } from '@/components/ui/button'
import CartItemContent from './cartItemContent'
// import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Sheet, SheetContent, SheetHeader,SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
function UserCartWrapper({ cartItems }) {
  cartItems = cartItems.items || []
  const totalAmount = cartItems.length > 0 ? cartItems.reduce(
    (sum, currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price)
      * currentItem?.quantity, 0
  ) : 0;
  return (
  <div>
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
            Review your cart items below and proceed to checkout.
          </SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4">
    
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (<CartItemContent cartItem={item} />)  )
          : <p>Empty Cart</p>}

      </div>
     

    <div className='mt-8 space-y-4'>
        <div className='flex justify-between'>
            <span className='font-bold' >Total </span>
            <span className='font-bold' >Ksh:{totalAmount}</span>

        </div>
    </div>
    <Button className='w-full mt-8 ' >CheckOut</Button>
    </SheetContent>

    </div>
  )
}

export default UserCartWrapper