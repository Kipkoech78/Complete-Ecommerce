import { DiscIcon, HousePlus, LogOut, Menu, ShoppingCart, UserCog,  } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logoutUser } from '@/store/auth-slice'
import UserCartWrapper from './cartWrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
function MenuItems(){
  return <nav className='flex flex-col mb-3 lg:items-center lg:flex-row gap-6' >
  {
    shoppingViewHeaderMenuItems.map(menuItem=><Link key={menuItem.id} to={menuItem.path} 
    className='text-sm font-medium' >
      {
        menuItem.label
      }
    </Link> )
  }
  </nav>
}

function HeaderRightContent(){
  const [openUserCartSheet, setOpenUserCartSheet] = useState(false)
  const navigate = useNavigate()
  const {user} = useSelector(state=> state.auth )
  const username = user?.userName
  const dispatch =  useDispatch()
  const {cartItems} = useSelector((state) => state.shopCart)
  function handleLogout(){
    dispatch(logoutUser())
  }
  useEffect(()=>{
    dispatch(fetchCartItems(user.id))
  },[dispatch])
  console.log("cart Item", cartItems)
  return <div className='flex lg:items-center lg:flex-row flex-col gap-4' >
  <Sheet open={openUserCartSheet} onOpenChange={()=>setOpenUserCartSheet(false)} >
  <Button onClick={()=>setOpenUserCartSheet(true)} variant ="outlined" size="icon" className='shadow-lg' >
    <ShoppingCart className='w-7 h-7' />
  </Button>
  <UserCartWrapper cartItems={cartItems} />
  </Sheet>
  <DropdownMenu>
    <DropdownMenuTrigger asChild >

    <Avatar className='bg-black'  >
      <AvatarFallback className='bg-black text-white font-extrabold justify-items-center ' > {
        username.substring(0, 2).toUpperCase()
      } </AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent side ='right'className='w-55' >
    <DropdownMenuLabel> Logged in as {username} </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick = {()=> navigate('/shop/accounts')} >
      <UserCog className='mr-2 w-6 h-6'/> Account
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick= {handleLogout} >
      <LogOut className='mr-2 w-6 h-6'/> Logout
    </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>

  </div>
}
function ShoppingHeader() {
  const {isAuthenticated, user} = useSelector(state=> state.auth )
  console.log("User Info", user)

  return (
    <header className='sticky top-0  w-full border-b bg-background' >
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
      <Link to={'/shop/home'} className='flex gap-3 items-center ' >
      <HousePlus className='h-6 w-6' />
      <span className='font-bold' >Ecommerce</span>
      </Link>
      <Sheet>
      <SheetTrigger asChild >
      <Button  size = "icon" className="lg:hidden" variant= 'outlined' >
        <Menu className='w-6 h-6' />
        <span className='sr-only'>Togglle Header menu</span>
      </Button>
      </SheetTrigger>
      <SheetContent side="left" className ="w-full max-w-xs" >
      <MenuItems />
      <HeaderRightContent />
      </SheetContent>

      </Sheet>
      <div className='hidden lg:block' >
        <MenuItems />
      </div>
       <div className='hidden lg:block' >
        <HeaderRightContent />
        </div> 
      
      </div>
    
    </header>
  )
}

export default ShoppingHeader
