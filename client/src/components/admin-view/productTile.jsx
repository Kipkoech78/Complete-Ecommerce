import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
function AdminproductTile({Product, setFormData, setCreateProductDialogue, setCurrentEditedId, isEditMode, handleDelete }) {
  return (
    <Card key={Product?._id}>
        <div className='relative'>
        <img 
            src={Product?.image} alt = {Product?.title}
            className='w-full h-[300px] object-cover rounded-t-lg '
        />
        </div>
        <CardContent>
            <h2 className='text-xl font-bold mb-2 mt-2 ' > {Product?.title} </h2>
            <div className='flex justify-between items-center mb-2' >
                <span className={`${Product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${Product?.price}</span>
               
                {
                    Product?.salePrice > 0 ?  (<span className='text-lg font-bold' >${Product?.salePrice} </span>)
                     : null
                }
            </div>
        </CardContent>
            <CardFooter className ='flex justify-between items-center' >
            <Button onClick ={()=>{
                setCreateProductDialogue(true)
                setCurrentEditedId(Product?._id)
                setFormData(Product)
            }} >Edit</Button>
            <Button onClick ={()=>{
                handleDelete(Product?._id)
            }} >Delete</Button>
            </CardFooter>
        
    </Card>
  )
}
export default AdminproductTile