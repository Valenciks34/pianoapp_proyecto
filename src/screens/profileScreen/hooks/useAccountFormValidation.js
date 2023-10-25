import { useState } from "react";


export const useAccountFormValidation = () => {
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const accountFormIsValid = () => {
    setFormErrors({});

    let tempErrors = {};

    let {firstName, lastName, phone } = form;

    if(firstName !== undefined) {
      firstName = firstName.trim();
      if(firstName.length == 0) {
        tempErrors = {...tempErrors, firstName: "El nombre es obligatorio"};
      }
    }

    if(lastName !== undefined) {
      lastName = lastName.trim();
      if(lastName.length === 0) {
        tempErrors = {...tempErrors, lastName: "El apellido es obligatorio"};
      }
    }

    var validPhone = /^\d+$/;

    if(!phone) {
      phone = phone.trim();
      if((!phone.match(validPhone) || phone.length !== 10)) {
        tempErrors = {...tempErrors, phone: "Ingrese un telefono valido"};
      }
    }

    if(Object.keys(tempErrors).length > 0) {
      setFormErrors(tempErrors);
      return false;
    }

    setForm({...form, firstName, lastName, phone});

    return true;
  };

  return {form, setForm, formErrors, accountFormIsValid };
};