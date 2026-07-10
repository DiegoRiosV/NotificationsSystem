# NotificationsSystem
Sistema de notificaciones Toast reutilizable en React puro, sin librerías externas, con animaciones CSS y múltiples toasts simultáneos.

# React Toast Notifications

Sistema de notificaciones tipo Toast construido con React + Vite, sin dependencias externas de animación ni UI. Soporta múltiples notificaciones simultáneas, duración configurable por toast, cierre manual y animaciones de entrada/salida hechas con CSS puro.

## Características

- 🔔 Notificaciones tipo Toast (success / error)
- 🧩 Arquitectura basada en Context API (`ToastProvider` + hook `useToast`)
- ⏱️ Duración personalizable por notificación (mínimo 3 segundos)
- ✖️ Cierre manual con animación de salida
- 📚 Soporte para múltiples toasts apilados, sin librerías externas
- 🎨 Animaciones CSS puras (sin Framer Motion ni React Transition Group)
