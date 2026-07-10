import { useState } from 'react'
import ToastProvider from "./components/Toast/ToastProvider";
import ToastTester from "./components/ToastTester";

function App() {
  return (
    <ToastProvider>
      <ToastTester />
    </ToastProvider>
  );
}

export default App;