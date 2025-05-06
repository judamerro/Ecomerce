'use client';
import IProduct from '@/interfaces/IProduct';
import { IUserSession } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ProductDetail: React.FC<IProduct> = ({ name, image, description, stock, price, id, categoryId }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [cartCount, setCartCount] = useState(0); // Nuevo estado para contar los productos en el carrito
  const router = useRouter();

  // Cargar datos del usuario del localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem('userSession')!);
      setUserData(userData);
    }

    // Cargar la cantidad de productos en el carrito al iniciar
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  // Función para manejar el click en el botón "Agregar al Carrito"
  const handleClick = () => {
    if (userData?.token) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const productExist = cart.some((product: IProduct) => product.id === id);

      if (productExist) {
        Swal.fire({
          title: 'El producto ya existe en el Carrito',
          text: 'Intenta Registrate o iniciar Sesion',
          icon: 'error',
        });
        router.push('/cart');
      } else {
        cart.push({ name, image, description, stock, price, id, categoryId });
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartCount(cart.length + 1); // Incrementar el contador del carrito
        Swal.fire({
          title: 'Producto agregado al Carrito',
          text: 'Intenta Registrate o iniciar Sesion',
          icon: 'success', // Cambiado a 'success' para indicar éxito
        });
        router.push('/cart');
      }
    } else {
      Swal.fire({
        title: 'No estás Registrado',
        text: 'Intenta Registrate o iniciar Sesion',
        icon: 'error',
      });
      router.push('/login');
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-50">
        <img 
          src={image} 
          alt="Imagen del producto" 
          className="w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <p className="text-xl font-bold text-blue-600 mb-2">Price: ${price}</p>
          <p className="text-sm text-gray-500">Stock: {stock > 0 ? `${stock} available` : 'Out of stock'}</p>
        </div>
  
        <button  
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

        >
          Add to Cart
        </button> 
      </div>
     
    </div>
  );
};

export default ProductDetail;
