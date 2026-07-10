import { useState, useRef, useCallback, useEffect } from "react";
import ToastContext from "../../context/ToastContext";
import ToastContainer from "./ToastContainer";

const DEFAULT_DURATION = 3000;
const CLOSE_ANIMATION_DURATION = 300;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const idCounterRef = useRef(0);
  const timersRef = useRef(new Map());

  const clearTimers = useCallback((id) => {
    const timers = timersRef.current.get(id);
    if (timers) {
      clearTimeout(timers.autoCloseTimer);
      clearTimeout(timers.removeTimer);
      timersRef.current.delete(id);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    clearTimers(id);
  }, [clearTimers]);

  const startCloseToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );

    const timers = timersRef.current.get(id);
    if (timers?.autoCloseTimer) {
      clearTimeout(timers.autoCloseTimer);
    }

    const removeTimer = setTimeout(() => {
      removeToast(id);
    }, CLOSE_ANIMATION_DURATION);

    timersRef.current.set(id, { ...timers, removeTimer });
  }, [removeToast]);

  const showToast = useCallback(({ type, message, duration = DEFAULT_DURATION }) => {
    idCounterRef.current += 1;
    const id = `${Date.now()}-${idCounterRef.current}`;

    const newToast = { id, type, message, duration, isClosing: false };

    setToasts((prev) => [newToast, ...prev]);

    const autoCloseTimer = setTimeout(() => {
      startCloseToast(id);
    }, duration);

    timersRef.current.set(id, { autoCloseTimer, removeTimer: null });
  }, [startCloseToast]);

  useEffect(() => {
    const timersMap = timersRef.current;
    return () => {
      timersMap.forEach(({ autoCloseTimer, removeTimer }) => {
        clearTimeout(autoCloseTimer);
        clearTimeout(removeTimer);
      });
      timersMap.clear();
    };
  }, []);

  const value = { showToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={startCloseToast} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;