'use client';

import { getOrders } from '@/Helpers/order.helper';
import { IOrder, IUserSession } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrdersView = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [userData, setUserData] = useState<IUserSession | null>(null);

  // Función para cargar las órdenes del usuario
  const fetchData = async () => {
    try {
      if (userData?.token) {
        const response = await getOrders(userData.token);
        setOrders(response);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // useEffect para verificar la sesión del usuario y redirigir si no está autenticado
  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData) as IUserSession;
      setUserData(parsedUserData);
    } else {
      router.push('/login'); // Redirigir si no hay datos de usuario almacenados
    }
  }, [router]);

  // useEffect para cargar las órdenes una vez que userData esté disponible
  useEffect(() => {
    if (userData?.token) {
      fetchData();
    }
  }, [userData]);

  // Función para calcular el total de todas las órdenes
  const calculateOrderTotal = (order: IOrder): number => {
    return order.products.reduce((sum, product) => sum + product.price, 0);
  };

  // Función para calcular el total de todas las órdenes
  const calculateTotal = (): number => {
    return orders.reduce((acc, order) => acc + calculateOrderTotal(order), 0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        {orders && orders.length > 0 ? (
          <>
            {orders.map((order) => {
              const orderTotal = calculateOrderTotal(order);
              return (
                <div key={order.id} className="mb-6 border-b border-gray-300 pb-4">
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Date: {new Date(order.date).toDateString()}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {order.products.map((product) => (
                      <div key={product.id} className="flex justify-between py-2">
                        <span className="text-gray-700">{product.name}</span>
                        <span className="text-gray-900 font-semibold">${product.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-right">
                    <p className="text-lg font-semibold">Order Total: ${orderTotal.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>You don't have any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersView;
