import React, { useEffect, useState } from 'react'
import bannerone from '../../assets/ruthlanding2.png'
import bannetwo from '../../assets/banner-1.webp'
import bannerthree from '../../assets/banner-2.webp'
import bannerfour from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeft, ChevronRight, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const  categoryWithIcon = [
  { id: "men", label: "Men" , icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [ bannerone, bannetwo, bannerfour, bannerthree]
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide =>(prevSlide +1 ) % slides.length)
    },5000)
    return ()=>clearInterval(timer)
  },[])


  return (
    <div className='flex flex-col min-h-screen '  >
    <div className='relative w-full h-[600px] overflow-hidden' >
    {slides.map((slide, index) => <img 
      src = {slide} key={index}
      className={`${index === currentSlide ? 'opacity-100' : 'opacity-0' } absolute top-0 w-full left-0 object-cover transition-opacity duration-1000`}
    /> )}
    <Button onClick ={()=> setCurrentSlide((prevSlide)=>(prevSlide -1 + slides.length) % slides.length ) }
     variant='outline' size='icon' 
    className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80' >
    <ChevronLeft  />
     </Button>
     <Button onClick ={()=> setCurrentSlide((prevSlide)=>((prevSlide +1 )- slides.length) %slides.length ) }
     variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80' >
    <ChevronRight  />
     </Button>
    </div>
    <section className='py-12 bg-gray-50 items-center ' > 
    <div className='container mx-auto px-4' > <h2 className='text-center mb-6 font-bold text-3xl' >Shop By category</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ' >
    {
      categoryWithIcon.map((item)=> <Card className='cursor-pointer hover:shadow-lg transition-shadow' >
      <CardContent className='flex flex-col items-center justify-center p-4' >
      <item.icon className='w-12 h-12 mb-4 text-primary' />
      <span> {item.label} </span>

      </CardContent>

      </Card>)
    } </div>
     </div>
    </section>
    </div>
  )
}

export default ShoppingHome