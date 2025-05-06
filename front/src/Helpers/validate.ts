import { ILoginErros, ILoginProps } from "@/interfaces/Types";

export function validateLoginForm (valores: ILoginProps){
    const errors:ILoginErros = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(valores.email && !emailRegex.test(valores.email) ){
        errors.email = "El email ingresado no es valido"

    }
    return errors
}