import { getProductsDyId } from '@/Helpers/product.helper'
import ProductDetail from '@/views/ProductDetail/ProductDetail'
import React from 'react'

const Detail = async ({params}: {params:{productS: string}}) => {
  
   const product = await getProductsDyId(params.productS)
  return (
    <ProductDetail {...product}/>
  )
}

export default Detail
