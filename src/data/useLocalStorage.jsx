import { useState, useRef, useEffect } from 'react';

const useLocalstorage = (key, initialValue, { serialize = JSON.stringify, deserialize = JSON.parse } = {}) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return deserialize(item);
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    try {
      if (prevKeyRef.current !== key) {
        window.localStorage.removeItem(prevKeyRef.current);
      }

      prevKeyRef.current = key;
      window.localStorage.setItem(key, serialize(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, serialize, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalstorage;
