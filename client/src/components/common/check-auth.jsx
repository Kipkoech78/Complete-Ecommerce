import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log("anauth page ", location.pathname, isAuthenticated)

  // Redirect unauthenticated users to login unless they're on the login or register page
  if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    return <Navigate to='/auth/login' />
  }

  // Redirect authenticated users away from login or register
  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    return user?.role === 'admin' ? <Navigate to='/admin/dashboard' /> : <Navigate to='/shop/home' />
  }

  // Prevent regular users from accessing admin routes
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
    return <Navigate to='/unauth-page' />
  }

  // Prevent admins from accessing shopping routes
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/shop')) {
    return <Navigate to='/admin/dashboard' />
  }

  return <>{children}</>;
}

export default CheckAuth;
