'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { validateLoginForm } from "@/Helpers/validate";
import {  IRegisterError, IRegisterProps,  } from "@/interfaces/Types";
import { registro } from '@/Helpers/auth.helper';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


const Register: React.FC = () => {
    const router = useRouter();
  
  const initialState: IRegisterProps = {
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",

  };


  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError >(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(dataUser);
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registro(dataUser);
      Swal.fire({
        title: "Usuario Registrado con Éxito",
        text: "Ya puedes iniciar sesión",
        icon: "success",
      });
      router.push("/login");
    } catch (error: any) {
      console.error('Registration error:', error.message);
      Swal.fire({
        title: "Faltan Campos O el correo ya existe",
        text: error.message || "Intenta nuevamente",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const validationErrors = validateLoginForm(dataUser);
    setErrors(validationErrors);
  }, [dataUser]);

  return (

    <div className='w-1/2 mx-auto mt-10'>
  <div className="flex w-1/2 items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 border-gray-200">
    <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
      <h3 className="text-4xl font-bold text-center mb-6 text-blue-800">Register</h3>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-6">
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-800 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email-address"
            name="email"
            value={dataUser .email}
            onChange={handleChange}
            placeholder="email@gmail.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={dataUser .password}
            onChange={handleChange}
            placeholder="********"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={dataUser .name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-2">
            Direccion:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={dataUser .address}
            onChange={handleChange}
            placeholder="Direccion"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-2">
            Telefono:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={dataUser .phone}
            onChange={handleChange}
            placeholder="Telefono"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 ease-in-out"
          disabled={Object.values(errors).some((error) => error !== '')}
        >
          Register
        </button>
      </form>
   </div>

   </div></div>
  );
};

export default Register;
