import { useState } from "react"


export const useRegisterFormValidation = () => {
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const registerFormIsValid = () => {
    setFormErrors({});

    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let tempErrors = {};

    const email = form.email.trim().toLowerCase();

    if(!email.match(validEmail)){
      tempErrors = {...tempErrors, email: "Debe ingresar un email valido"};
    }

    const password = form.password.trim();

    if(password.length < 6){
      tempErrors = {...tempErrors, password: "La contraseña debe tener minimo 6 caracteres"};
    }

    // Si hay un error devuelve falso
    if(Object.keys(tempErrors).length > 0) {
      setFormErrors(tempErrors);
      return false;
    }

    setForm({email, password});

    // Si no hay errores devuevle verdadero
    return true;
  }

  return {form, setForm, formErrors, registerFormIsValid }
}