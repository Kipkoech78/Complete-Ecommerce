import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'
import { brandOptionsMap, categoryOptionsMap } from '@/config'


function ShoppingProductTile({product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <Card key={product.id} className="w-full max-w-sm mx-auto">
    <div onClick={()=>{
         handleGetProductDetails(product._id) 
         // setOpen= {}
    }}>
    <div
     className='relative' >

        <img src={product.image} alt={product.name}
        className='w-full h-[300px] object-cover rounded-t-lg ' />
        {
            product?.price > 0 ? <Badge className="absolute top-2 bg-red-500 hover:bg-red-700 left-2" variant="outline"> Sale </Badge> : null
        }

    </div>
    <CardContent className='p-4' >
        <h2 className='text-xl font-bold mb-2'>{product?.title} </h2>
        <div className='flex justify-between mb-2 items-center' >
            <span className='text-sm text-muted-foreground' >  {categoryOptionsMap[product?.category]}</span>
            <span className='text-sm text-muted-foreground' >  {brandOptionsMap[product?.brand]}</span>
        </div>
        <div className='flex justify-between mb-2 items-center' >
            <span className={`${product.salePrice > 0 ? 'line-through decoration-2 decoration-offset-[0.5em] ' : '' } text-lg font-semibold`} >  ksh:{product?.salePrice}</span>
            <span className={`text-lg font-semibold`} >  ksh: { product.price > 0 ? product.price : null } </span>
        </div>
    </CardContent>
    </div>
    <CardFooter>
        <Button onClick={()=>handleAddtoCart(product?._id)} className='w-full'>
            Add to cart
        </Button>
    </CardFooter>
  

    </Card>
  )
}

export default ShoppingProductTile