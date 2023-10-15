import { useState } from "react"


export const useRestorePasswordFormValidation = () => {
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const restorePasswordFormIsValid = () => {
    setFormErrors({});

    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let tempErrors = {};

    const email = form.email.trim().toLowerCase();

    if(!email.match(validEmail)){
      tempErrors = {...tempErrors, email: "Debe ingresar un email valido"};
    }

    if(Object.keys(tempErrors).length > 0) {
      setFormErrors(tempErrors);
      return false;
    }

    setForm({email});

    return true;
  }

  return {form, setForm, formErrors, restorePasswordFormIsValid }
}