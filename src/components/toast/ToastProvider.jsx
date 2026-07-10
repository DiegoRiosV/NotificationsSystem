import { useState, useRef, useCallback } from "react";
import ToastContext from "../../context/ToastContext";

const DEFAULT_DURATION = 3000;

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const timeoutRef = useRef(null);

  const showToast = useCallback(({ type, message, duration = DEFAULT_DURATION }) => {
   if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ type, message, duration });

    timeoutRef.current = setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, duration);
  }, []);

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;