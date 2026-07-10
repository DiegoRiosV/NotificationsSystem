export default function Toast({ id, type, message, onClose }) {
  return (
    <div className={`toast ${type}`}>
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