'use client';
import { CreateOrder } from '@/Helpers/order.helper';
import IProduct from '@/interfaces/IProduct';
import { IUserSession } from '@/interfaces/Types';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CarritoView = () => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);

      // calcula el precio de la compra
      const calculatedTotal = storedCart.reduce((acc: number, product: IProduct) => acc + product.price, 0);
      setTotalPrice(calculatedTotal);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem('userSession')!);
      setUserData(userData);
    }
  }, []);

  const handleClick = async () => {
    const idProducts = cart.map((product) => product.id);
    await CreateOrder(idProducts, userData?.token!);
      if(cart.length === 0){
        Swal.fire({
          title: 'Carrito Vacío',
          text: 'Tu carrito está vacío. Agrega productos antes de proceder.',
          icon: 'warning',
        });

      }else{
        Swal.fire({
          title: 'Tu Compra fue exitosa',
          text: 'ya puede Comprar',
          icon: 'success',
        });
      }
    

    setCart([]);
    setTotalPrice(0);
    localStorage.setItem('cart', '[]');
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-around w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="w-full md:w-2/3 p-4 space-y-4">
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-200 ease-in-out"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-gray-700">No tienes Productso en el Carrito</p>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md text-center">
        <p className="text-xl font-bold text-gray-800">Total: ${totalPrice}</p>
        <button
          onClick={handleClick}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CarritoView;
