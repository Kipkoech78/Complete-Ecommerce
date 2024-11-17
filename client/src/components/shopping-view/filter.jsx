import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@radix-ui/react-label'
import { Separator } from "@/components/ui/separator"



function ProductFilter({filters, HandleFilter}) {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
    <div className='p-4 border-b' >
        <h2 className='text-lg font-extrabold' > Filters</h2>
    </div>
    <div className='p-4 space-y-4' >
        {
            Object.keys(filterOptions).map(keyItem => <Fragment>
                <div>
                    <h3 className='text-base font-bold' > {keyItem} </h3>
                    <div className='grid gap-2 mt-2' >
                    {filterOptions[keyItem].map(option => <Label className='flex items-center gap-2 font-normal' >
                    <Checkbox 
                    checked = {
                        filters && Object.keys(filters).length > 0 && 
                        filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={()=> HandleFilter(keyItem, option.id)} />
                     {option.label}
                    </Label>)}
                    </div>
                </div>
                <Separator />
            </Fragment> )
        }
    </div>

    </div>
  )
}

export default ProductFilter