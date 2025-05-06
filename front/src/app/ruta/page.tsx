import { getProductsDyId } from '@/Helpers/product.helper'
import ProductDetail from '@/views/ProductDetail/ProductDetail'
import React from 'react'

const Detail = async({params}: {params:{productId: string}}) => {
    const product = await getProductsDyId(params.productId)
  return (
    <div>
      <ProductDetail {...product}/>
    </div>
  )
}

export default Detail
