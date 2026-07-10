import { useState, useRef, useCallback } from "react";
import ToastContext from "../../context/ToastContext";
import Toast from "./Toast";

const DEFAULT_DURATION = 3000;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const idCounterRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ type, message, duration = DEFAULT_DURATION }) => {
    idCounterRef.current += 1;
    const id = `${Date.now()}-${idCounterRef.current}`;

    const newToast = { id, type, message, duration };

    setToasts((prev) => [newToast, ...prev]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const value = { showToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </ToastContext.Provider>
  );
}

export default ToastProvider;