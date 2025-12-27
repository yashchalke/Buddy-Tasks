import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
       <div className='grid grid-rows-3 gap-4 p-4 h-95'>
        <Link href={"/add-task"} className='w-full bg-blue-400 p-6 rounded-xl text-xl font-semibold hover:bg-blue-600'>Add Today's Tasks</Link>
        <Link href={"/today-task  "} className='w-full bg-green-300 p-6 rounded-xl text-xl font-semibold hover:bg-green-500'>Today's Tasks</Link>
        <Link href={"/all-tasks "} className='w-full bg-yellow-300 p-6 rounded-xl text-xl font-semibold hover:bg-yellow-400'>All tasks</Link>
        </div>
    </div>
  )
}

export default page