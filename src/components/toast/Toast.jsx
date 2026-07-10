import "./toast.css";
export default function Toast({ id, type, message, isClosing, onClose }) {
  const icon = type === "success" ? "✓" : "✕";

 const stateClass = isClosing ? "toast-closing" : "toast-enter";

  return (
    <div className={`toast ${type} ${stateClass}`}>
      <span className="toast-icon">{icon}</span>

      <span className="toast-message">{message}</span>

      <button
        type="button"
        className="toast-close-button"
        onClick={() => onClose(id)}
        aria-label="Cerrar notificación"
      >
        X
      </button>
    </div>
  );
}