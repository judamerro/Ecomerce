'use client';

import { Login } from "@/Helpers/auth.helper";
import { validateLoginForm } from "@/Helpers/validate";
import { ILoginErros, ILoginProps } from "@/interfaces/Types";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";


const LoginView = () => {

  const router = useRouter();
  const initialState = {
    email: "",
    password: ""
  };

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErros>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value
    });
  };

  if(!dataUser){

      
    Swal.fire({
      title: "Usuario no registrado",
      text: "ya puede Comprar",
      icon: "success",
    });
    router.push("/login")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await Login(dataUser)
    const {token, user} = response;
    localStorage.setItem("userSession", JSON.stringify({token, user}))
 
    Swal.fire({
      title: "Datos Correctos",
      text: "ya puede Comprar",
      icon: "success",
    });
    router.push("/")
  };

  useEffect(() => {
    const errors =validateLoginForm(dataUser)
    setErrors(errors)
  }, [dataUser]);




  return (
   
    
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
  <div className="bg-gray-100 p-10 rounded-xl shadow-lg w-full max-w-sm mx-auto">
    <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Sign In</h2>
    <form onSubmit={handleSubmit} className="max-w-full mx-auto">
      <div className="mb-4">
        <label htmlFor="email-address" className="block text-sm font-medium text-gray-800 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email-address"
          name="email"
          value={dataUser.email}
          onChange={handleChange}
          placeholder="email@gmail.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={dataUser.password}
          onChange={handleChange}
          placeholder="********"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
        disabled={errors.email ? true : false}
      >
        Sign In
      </button>
    </form>
  </div>
</div>

  
  
  
  );
};

export default LoginView;
