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
    <div style={{ padding: "16px", border: "1px solid #ccc", maxWidth: "400px" }}>
      <h3>Toast Tester</h3>

      <label htmlFor="toast-message">Mensaje:</label>
      <br />
      <textarea
        id="toast-message"
        value={message}
        onChange={handleMessageChange}
        rows={3}
        style={{ width: "100%" }}
      />
      <div>
        {message.length} / {MAX_CHARACTERS} caracteres
      </div>

      <div style={{ marginTop: "8px" }}>
        Duración actual: {duration} segundos
      </div>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <button type="button" onClick={() => handleSend("error")}>
          Error
        </button>
        <button type="button" onClick={() => handleSend("success")}>
          Exitoso
        </button>
        <button type="button" onClick={handleIncreaseDuration}>
          +1 segundo
        </button>
        <button type="button" onClick={handleDecreaseDuration}>
          -1 segundo
        </button>
      </div>
    </div>
  );
}