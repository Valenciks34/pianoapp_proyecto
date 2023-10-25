import { useState } from "react";


export const useRestorePasswordFormValidation = () => {
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const restorePasswordFormIsValid = () => {
    setFormErrors({});

    var validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    let tempErrors = {};

    let { email } = form;

    if(!email){
      tempErrors = {...tempErrors, email: "El email es obligatorio"};
    } else {
      email = email.trim().toLowerCase();
      if(!email.match(validEmail)) {
        tempErrors = {...tempErrors, email: "Debes ingresar un email valido"};
      }
    }

    if(Object.keys(tempErrors).length > 0) {
      setFormErrors(tempErrors);
      return false;
    }

    setForm({email});

    return true;
  };

  return {form, setForm, formErrors, restorePasswordFormIsValid };
};