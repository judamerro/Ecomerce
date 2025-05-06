import {ILoginProps, IRegisterProps} from "@/interfaces/Types"
import Swal from "sweetalert2"
const APIURL = process.env.NEXT_PUBLIC_API_URL


export async function registro (userData: IRegisterProps){
    try {
        const res = await fetch(`${APIURL}/users/register`,{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Falló el registro") 
        }
    } catch (error :any) {
        throw new Error(error)
    }
}

export async function Login (userData: ILoginProps){
    try {
        const res = await fetch(`${APIURL}/users/login`,{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const response = await res.json()

        if(res.status === 400){
            Swal.fire({
                title: "Usuario no existe",
                text: "Verifica los datos",
                icon: "error",
              });
            throw new Error(response.data.message) 
            
        }else  {
           return response
        }
    } catch (error :any) {
        throw new Error(error)
    }
}