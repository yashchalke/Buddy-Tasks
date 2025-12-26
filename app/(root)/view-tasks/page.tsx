import React from 'react' 
import Todaystask from '../../(components)/Todaystask'

const page = () => {
  return (
    <div>
        <div className='flex justify-between'>
        <h1>Today's Tasks</h1>
        <div className='flex'>
        <h1>Progress: </h1>
        <div className='w-50 border rounded-full bg-green-400'>
            <h1 className='text-center z-10'>100%</h1>
        </div>
        
        </div>
        </div>
        <Todaystask />
        
    </div>
  )
}

export default page