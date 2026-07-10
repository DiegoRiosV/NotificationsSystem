export default function Toast({ type, message }) {
  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}