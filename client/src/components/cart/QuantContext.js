// QuantContext.js
import { createContext, useContext, useState } from 'react';

const QuantContext = createContext();

export function useQuantContext() {
  return useContext(QuantContext);
}

export function QuantProvider({ children }) {
  const [quant, setQuant] = useState(1);

  return (
    <QuantContext.Provider value={{ quant, setQuant }}>
      {children}
    </QuantContext.Provider>
  );
}
