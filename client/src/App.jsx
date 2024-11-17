//import './App.css'
import AuthLayout from './components/auth/layout'
import { Routes, Route } from 'react-router-dom'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found/notfound'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import CheckAuth from './components/common/check-auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"


function App() {
  const {isAuthenticated,user, isLoading} = useSelector(state => state.auth)
  console.log("user info",   user)
  console.log("Authentication",   isAuthenticated)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])
console.log( "Check if loading" , isLoading)
  if(isLoading) return  <Skeleton className="w-[100%] h-[100%] bg-black " />

  // const isAuthenticated = false;
  // const user = null;
  return (
    <div className='flex, flex-col overflow-hidden bg-white'>
   
    <Routes>
      <Route path = '/auth' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user} >
          <AuthLayout />
        </CheckAuth>
      }>
        <Route path = 'login' element={<AuthLogin />} />
        <Route path = 'register' element={<AuthRegister />} />

      </Route>
      <Route path='/admin' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user} >
          <AdminLayout />
        </CheckAuth>
      } >
      <Route path='dashboard' element= {<AdminDashboard />} />
      <Route path='featured' element= {<AdminFeatures />} />
      <Route path='product' element= {<AdminProducts />} />
      <Route path='orders' element= {<AdminOrders />} />
      </Route>
      <Route path='/shop' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      }>
      <Route path='home' element= {<ShoppingHome />} />
      <Route path='listing' element= {<ShoppingListing />} />
      <Route path='accounts' element= {<ShoppingAccount />} />
      <Route path='checkout' element= {<ShoppingCheckout />} />

      </Route>
      <Route path='*' element={<NotFound />} />
      <Route path='unauth-page' element={<p>Not authenticated .. later  Linus create file to render the page now is just a p tag element </p>} />
    </Routes>
    </div>
   
  )
}

export default App
