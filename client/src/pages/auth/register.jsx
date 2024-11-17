import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function AuthRegister() {
  const [formData, setFormData] = React.useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()
  const time = new Date()


  function onSubmit(e) {
    e.preventDefault()
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
          description: time.toLocaleTimeString(),
          variant: 'success',
        })
        navigate('/auth/login')
      }
      else{
        toast({
          title:data?.payload?.message,
          description: time.toLocaleTimeString(),
          variant: 'destructive',
        })
      }
      console.log(data)
    } )
    console.log(formData)
  }



  return (
    <div className='mx-auto w-full max-w-md space-y-6' >
      <div className='text-center' >
        <h1 className='text-3xl font-bold tracking-tight text-foreground'> Create New Account</h1>
        
      </div>
      <CommonForm formcontrols={registerFormControls}
       buttonText={'Create Account'} 
       onSubmit={onSubmit}
      formData={formData} setFormData={setFormData} />

<p className='mt-2'> Already have an account
        <Link to='/auth/login' className='ml-2 text-primary font-medium hover: underline'> Login</Link>
        </p>
    </div>
  )
}

export default AuthRegister