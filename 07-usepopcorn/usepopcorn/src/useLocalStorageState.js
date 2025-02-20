import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // when the application first loads grab the watched items and set the watched list
  // lazy initial state
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
    // NOT THIS: WILL NOT WORK:
    // useState(localStorage.getItem('value'))
  });

  //store value in local storage each time it changes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue];
}
