import { useState } from "react";
import { useToast } from "../hooks/useToast";

const MAX_CHARACTERS = 50;
const MIN_DURATION = 3;

export default function ToastTester() {
  const { showToast } = useToast();

  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(MIN_DURATION);

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setMessage(value);
    }
  };

  const handleIncreaseDuration = () => {
    setDuration((prev) => prev + 1);
  };

  const handleDecreaseDuration = () => {
    setDuration((prev) => Math.max(MIN_DURATION, prev - 1));
  };

  const handleSend = (type) => {
    if (message.trim() === "") {
      console.log("El mensaje no puede estar vacío");
      return;
    }

    showToast({
      type,
      message,
      duration: duration * 1000,
    });
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Toast Demo</h1>

        <label htmlFor="toast-message">Mensaje</label>
        <textarea
          id="toast-message"
          className="toast-input"
          value={message}
          onChange={handleMessageChange}
          rows={3}
          placeholder="Escribe el mensaje del toast..."
        />

        <div className="meta-row">
          <span className="char-count">{message.length} / {MAX_CHARACTERS} caracteres</span>
          <span className="duration">Duración actual: {duration} segundos</span>
        </div>

        <div className="controls">
          <div className="duration-controls">
            <button className="btn btn-secondary" type="button" onClick={handleDecreaseDuration}>-1 segundo</button>
            <button className="btn btn-secondary" type="button" onClick={handleIncreaseDuration}>+1 segundo</button>
          </div>

          <div className="action-controls">
            <button className="btn btn-error" type="button" onClick={() => handleSend("error")}>✕ Error</button>
            <button className="btn btn-success" type="button" onClick={() => handleSend("success")}>✓ Exitoso</button>
          </div>
        </div>
      </div>
    </div>
  );
}