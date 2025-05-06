/* eslint-disable @next/next/no-img-element */
"use client";
import { IUserSession } from '@/interfaces/Types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem('userSession')!);
      setUserData(userData);
    }

    // Cargar la cantidad de productos en el carrito al iniciar
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    
  }, []);
  

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(userData);
    }
  }, [pathname]);

  const handleLogout = () => {
    Swal.fire({
      title: "Tu sesión se ha cerrado correctamente",
      text: ":)",
      icon: "success",
    });
    localStorage.removeItem("userSession");
    router.push("/login");
  };
  

  return (
    <div>
      <nav className="bg-blue-50 border-gray-200 dark:bg-blue-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-icono-del-logo-de-apple.png?w=360"
              className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tienda Apple</span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue-50 dark:bg-blue-800 md:dark:bg-blue-900 dark:border-gray-700">
              <li>
                <Link href="/" className="block py-2 px-3 text-blue-800 bg-blue-200 rounded md:bg-transparent md:text-blue-800 md:p-0 dark:text-white md:dark:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-800 rounded hover:bg-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-800 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-800 rounded hover:bg-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-800 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Services
                </a>
              </li>
              <li>
                <div>
                  {userData?.token ? (
                    <Link href="/dashboard" className="block py-2 px-3 text-gray-800 rounded hover:bg-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-800 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Dashboard
                    </Link>
                  ) : (
                    <Link href="/register" className="block py-2 px-3 text-gray-800 rounded hover:bg-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-800 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Registro
                    </Link>
                  )}
                </div>
                
              </li>

              <li>
              <div> 
                    {userData?.token ? (
                      <button className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <li className="flex items-center space-x-1">
                        <Link href="/cart" className="flex items-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L3 3m4 10a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z"
                            />
                          </svg>
                          <span>{cartCount}</span>
                        </Link>
                      </li>
                    </button>) : (
                      ""
                    )}
                  

                </div>
              </li>
              <li>
                <div>
                  {userData?.token ? (
                    <button
                      onClick={handleLogout}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Cerrar Sesión
                    </button>
                  ) : (
                    <Link href="/login" className="block py-2 px-3 text-gray-800 rounded hover:bg-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-800 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Login
                    </Link>
                  )}
                </div>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
