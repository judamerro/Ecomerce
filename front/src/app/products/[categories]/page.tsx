import React from 'react';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import { getProductsByCategory } from '@/Helpers/product.helper';

const Categories = async ({ params }: { params: { categories: string } }) => {
  const { categories } = params;

  const filteredProducts = await getProductsByCategory(categories);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Produtctos {categories} Category</h1>

      <div className="flex flex-wrap items-center gap-4 p-4 justify-center">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card {...product} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
