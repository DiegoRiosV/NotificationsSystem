import { useState, useRef, useCallback } from "react";
import ToastContext from "../../context/ToastContext";
import Toast from "./Toast";

const DEFAULT_DURATION = 3000;
const CLOSE_ANIMATION_DURATION = 300; // debe coincidir con la transición CSS (.3s)

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const idCounterRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const startCloseToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );

    setTimeout(() => {
      removeToast(id);
    }, CLOSE_ANIMATION_DURATION);
  }, [removeToast]);

  const showToast = useCallback(({ type, message, duration = DEFAULT_DURATION }) => {
    idCounterRef.current += 1;
    const id = `${Date.now()}-${idCounterRef.current}`;

    const newToast = { id, type, message, duration, isClosing: false };

    setToasts((prev) => [newToast, ...prev]);

    setTimeout(() => {
      startCloseToast(id);
    }, duration);
  }, [startCloseToast]);

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
          isClosing={toast.isClosing}
          onClose={startCloseToast}
        />
      ))}
    </ToastContext.Provider>
  );
}

export default ToastProvider;