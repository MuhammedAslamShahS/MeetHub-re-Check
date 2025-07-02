import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // ✅ Import the toast provider
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "14px",
            padding: "12px 16px",
            background: "#1f1f1f",
            color: "#fff",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#10b981", // green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);
