import AdminproductTile from '@/components/admin-view/productTile'
import ProductImageUpload from '@/components/admin-view/uploadImage'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice'
import { Description } from '@radix-ui/react-toast'
import { DiscIcon } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function AdminProducts() {
  const initialFormData= {
    image : null,
    title :'',
    Description: '',
    category: '',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:'',

  };
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [openCreateProductDialog, setCreateProductDialogue] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const { productList } = useSelector(state => state.adminProducts)
  const {toast} = useToast()

  const dispatch = useDispatch()

  function onSubmit(e){
    e.preventDefault()
    //console.log(" Form data", formData)
    currentEditedId !== null ?
    dispatch(editProduct({
      id : currentEditedId, formData
    })).then((data)=>{
      console.log("Edited Product" , data)

      if(data?.payload?.success){
        setCreateProductDialogue(false)
        setCurrentEditedId(null)
        toast({
          title :"Product Updated successfuly"
        })
      }
    })
    :
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data)=>{
      console.log(data, "data after submit")
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setCreateProductDialogue(false)
        setImageFile(null);
        setFormData(initialFormData)
        toast({
          title: "Product saved successfully",
        })
      }
    })
  }
  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId)
    dispatch(deleteProduct(getCurrentProductId)).then(data =>{
      console.log(data?.payload)
      if(data?.payload?.success){
        // dispatch((state)=>{
        //   state.addNewProduct.productList = state.AdminProducts.productList.filter(
        //     (product) => product.id !==getCurrentProductId
        //   )
        // })
       dispatch(fetchAllProducts());
      }
    })
  }
  function isFormValid(){
    return Object.keys(formData)
    .map((key) => formData[key] !== "")
    .every((item) => item)
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])
  console.log(productList, uploadedImageUrl, "formData")
  return (
    <Fragment>
    <div onClick={()=> setCreateProductDialogue(true)} className='flex justify-end mb-5 w-full'>
    <Button >Add new Products</Button>
    </div>
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {
        productList && productList.length > 0 ? 
        productList.map(productItem => 
        < AdminproductTile
        key={productItem.id}
        setFormData = {setFormData}
        setCreateProductDialogue ={setCreateProductDialogue}
        setCurrentEditedId ={setCurrentEditedId}
        currentEditedId ={currentEditedId}
        handleDelete = {handleDelete}
         Product={productItem} /> ) : null

      }
    </div>
    <Sheet
    open = {openCreateProductDialog}
    onOpenChange={()=> {setCreateProductDialogue(false);
      setCurrentEditedId(null)
      setFormData(initialFormData)
      }
    }
    
    >
    <SheetContent side='right' className='overflow-auto' >
    <SheetHeader>
    <SheetTitle> {
      currentEditedId === null ? ("Add new Product") : "Edit Product"
    }</SheetTitle>
    
    </SheetHeader>
    <ProductImageUpload 
    imageFile={imageFile} 
    uploadedImageUrl = {uploadedImageUrl}
    setImageFile={setImageFile}
    imageLoadingState={imageLoadingState}
    setImageLoadingState = {setImageLoadingState}
    isEditMode = {currentEditedId !== null }
    setUploadedImageUrl={setUploadedImageUrl}  />
    <div className='py-6'>

      <CommonForm buttonText={ currentEditedId !==null ? "Edit Product" : "Add Product" }
      formData={formData} 
      setFormData={setFormData}
       onSubmit={onSubmit} 
        formcontrols={addProductFormElements} 
        isBtnDisabled = {currentEditedId === null ? isFormValid() : null }
      />
    </div>
    </SheetContent>
    </Sheet>
    
    </Fragment>
  )
}

export default AdminProducts