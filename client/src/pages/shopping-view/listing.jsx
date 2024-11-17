import ProductFilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { sortOptions } from '@/config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import {fetchFilteredProducts, fetchProductsDetailsById} from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/productTile'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialogue from '@/components/shopping-view/productDetails'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
function ShoppingListing() {
  const dispatch = useDispatch()
  //fetch list of all products
  //const { productList } = useSelector(state => state.adminProducts)
  const {productList, productDetails} = useSelector(state => state.shopProducts)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetDialogue, setOpenDetDialogue] = useState(false)
  const {user} = useSelector(state => state.auth)
  const {toast} = useToast()
 

  function handleValueSortChange(value){
    console.log("value sort clicked", value)
    setSort(value)
  }
  function createSearchParamsHelper(filterParams){
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length > 0 ) {
        const paramValue = value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    console.log("Query params" ,queryParams)
    return queryParams.join('&')
  }
  function HandleFilter(getSectionId, getCurrentOption){
    console.log(getSectionId, getCurrentOption)
    let cpyFiltrers = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFiltrers).indexOf(getSectionId)
    if(indexOfCurrentSection === -1){
      cpyFiltrers = {
        ...cpyFiltrers,
        [getSectionId]:[getCurrentOption]
      };
    }else{
      const indexOfCurrentOption = cpyFiltrers[getSectionId].indexOf(getCurrentOption)
      if(indexOfCurrentOption === -1) cpyFiltrers[getSectionId].push(getCurrentOption)
        else cpyFiltrers[getSectionId].splice(indexOfCurrentOption, 1 )
    }
    setFilters(cpyFiltrers)
    //save in storage session
    sessionStorage.setItem("filters", JSON.stringify(cpyFiltrers))
  }

  useEffect(() =>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])
//pass sort and filters
  useEffect(()=>{
    if(filters !== null && sort !== null)
    dispatch(fetchFilteredProducts({filterParams: filters, sortParams: sort}))
  },[dispatch, sort, filters])
  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {} )
  }, [])

  function handleGetProductDetails(getCurentProductId){
    console.log(getCurentProductId)
    dispatch(fetchProductsDetailsById(getCurentProductId))

  }
  //add to cart
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
  useEffect(()=>{
    if(productDetails !== null) setOpenDetDialogue(true)

  }, [productDetails])
   
  return (
    <div className='grid  sm: grid-cols-1 md:grid-cols-[200px_1fr]  gap-6 p-4 md:p-6 ' >
    <ProductFilter filters= {filters} HandleFilter={HandleFilter} />
    <div className='bg-background w-full rounded-lg shadow-sm' >

    <div className='p-4 border-b flex items-center justify-between' >
    <h2 className='text-lg shadow-sm font-extrabold' >All Products</h2>
    <div className='flex items-center mr-2 gap-2'>
    <span className='text-muted-foreground' >{productList.length} Products</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
      <Button className="flex gap-1 shadow-sm items-center" size="sm" variant="outlined" >
        <ArrowUpDownIcon className='h-4 w-4' />
        <span>Sort by.</span>
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
      <DropdownMenuRadioGroup value={sort} onValueChange={handleValueSortChange} >
      {
        sortOptions.map(sortItems=>(
          <DropdownMenuRadioItem 
          value = {sortItems.id}
          key={sortItems.id} >
          {sortItems.label} </DropdownMenuRadioItem>
        ))
      }
      </DropdownMenuRadioGroup>
      
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3'>
    {
      productList && productList.length > 0 ?
      productList.map((productItem) =>
       <ShoppingProductTile key={productItem.id} 
       handleAddtoCart ={handleAddtoCart}
      handleGetProductDetails = {handleGetProductDetails} 
      product={productItem} 
      
      /> ) :
      null
    }
    </div>
    </div>
    <ProductDetailsDialogue productDetails = {productDetails} open = {openDetDialogue} setOpen={setOpenDetDialogue} />
    </div>
  )
}

export default ShoppingListing