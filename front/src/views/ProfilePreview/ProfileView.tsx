'use client'
import { IUserSession } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

function ProfileView() {
    const router = useRouter()
    const [userData, setUserData] = useState<IUserSession | null>(null);

useEffect (()=>{



if(typeof window !== "undefined" && window.localStorage){

        const userData = JSON.parse(localStorage.getItem("userSession")!)
  setUserData(userData)
    
}
}, [])

const handleLogout = () => {
    Swal.fire({
        title: "Tu Session se ha cerrado corerctamente",
        text:  ":)",
        icon: "success",
      });
  localStorage.removeItem("userSession")
  router.push("/")    
}





  return (
   
    <div>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-1/2 mx-auto mt-10 text-gray-800 text-center">
        <h1 className="text-4xl font-extrabold mb-6 bg-gray-800 text-white rounded-full py-3 px-8 shadow-md">
            Dashboard de Usuario
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
            Bienvenido: <span className="text-blue-500">{userData?.user.name}</span>
        </h2>
        <h2 className="text-lg mb-3">
            Tu dirección es: <span className="text-blue-500">{userData?.user.address}</span>
        </h2>
        <h2 className="text-lg mb-3">
            Tu correo electrónico es: <span className="text-blue-500">{userData?.user.email}</span>
        </h2>
        <h2 className="text-lg mb-3">
            Tu teléfono es: <span className="text-blue-500">{userData?.user.phone}</span>
        </h2>
        <button  
            onClick={handleLogout}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-indigo-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        
        Cerrar Session
        </button>
        </div>
        
    </div>








  )
}

export default ProfileView
