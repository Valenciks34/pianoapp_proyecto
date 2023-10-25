import { useState } from "react";


export const useChangePasswordFormValidation = () => {
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const changePasswordFormIsValid = () => {
    setFormErrors({});

    let tempErrors = {};

    let {password, newPassword, newPasswordConfirmation } = form;

    if(!password){
      tempErrors = {...tempErrors, password: "La contraseña es obligatorio"};
    } else {
      password = password.trim();
      if(password.length < 6) {
        tempErrors = {...tempErrors, password: "La contraseña debe tener minimo 6 caracteres"};
      }
    }

    if(!newPassword){
      tempErrors = {...tempErrors, newPassword: "La Nueva contraseña es obligatoria"};
    } else {
      newPassword = newPassword.trim();
      if(newPassword.length < 6) {
        tempErrors = {...tempErrors, newPassword: "La contraseña debe tener minimo 6 caracteres"};
      }
    }

    if(newPassword !== newPasswordConfirmation){
      tempErrors = {...tempErrors, newPasswordConfirmation: "Las contraseñas no coinciden"};
    }

    if(Object.keys(tempErrors).length > 0) {
      setFormErrors(tempErrors);
      return false;
    }

    setForm({password, newPassword, newPasswordConfirmation});

    return true;
  };

  return {form, setForm, formErrors, changePasswordFormIsValid };
};