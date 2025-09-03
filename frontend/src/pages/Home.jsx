import React from 'react'
import { Search } from '../components';

export default function Home() {
  return (
    <div className='bg-white w-full min-h-screen'>
      <div>
        <div>
          <img className='w-full h-130' src="img_search.jpg" alt="" />
          <div><Search /></div>
        </div>
      </div>
    </div>
  )
}
