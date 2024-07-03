import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Retrieve the item from local storage if it exists
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving item from localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store the current value
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Update the local storage whenever the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting item to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
