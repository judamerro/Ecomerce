import IProduct from '@/interfaces/IProduct'
import React from 'react'

const Card: React.FC<IProduct> = ({name, price, image}) => {
  return (

    <div>
        
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
             
                  <img className="p-8 rounded-t-lg w-[180px] h-[200px] max-w-[180px] max-h-[auto]" src={image} alt="product image" />
             
              <div className="px-5 pb-5">
                  
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{name}</h5>
                  
                  
                  <div className="flex items-center flex-col">
                      <span className="text-1xl font-bold text-gray-900">${price}</span>
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Add to cart</button>
                  </div>
              </div>
          </div>
 </div>



  )
}

export default Card