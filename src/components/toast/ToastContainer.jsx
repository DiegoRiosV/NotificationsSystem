import Toast from "./Toast";

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          isClosing={toast.isClosing}
          onClose={onClose}
        />
      ))}
    </div>
  );
}