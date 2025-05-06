
import Link from 'next/link'
import React from 'react'


const  CategoryComponent = async () => {


    
  return (
    <div className='flex flex-col items-center justify-center  mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200'>
        <nav className="bg-blue-600 p-4 shadow-lg">
      <ul className="flex justify-around items-center text-white">
        <li className="hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 ease-in-out">
          <Link href="/products/1">
            Celulares
          </Link>
        </li>
        <li className="hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 ease-in-out">
          <Link href="/products/2">
            Makbook
          </Link>
        </li>
        <li className="hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 ease-in-out">
          <Link href="/products/3">
            Ipad Pro
          </Link>
        </li>
        <li className="hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 ease-in-out">
          <Link href="/products/4">
            Apple Whatch
          </Link>
        </li>
        <li className="hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 ease-in-out">
          <Link href="/products/5">
            Airpods
          </Link>
        </li>
        <li className="hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 ease-in-out">
          <Link href="/products/6">
            Homepods
          </Link>
        </li>
      </ul>
    </nav>

    </div>

  )
}

export default CategoryComponent
