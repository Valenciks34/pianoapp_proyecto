import { useState, useEffect } from "react";
import { storage } from "../../../config";


export const usePersistedState = (key) => {
  const [state, setState] = useState(() => {
    const storageValue = storage.getString(key);

    if(storageValue) {
      return JSON.parse(storageValue);
    }

    return null;
  });

  useEffect(() => {
    storage.set(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};