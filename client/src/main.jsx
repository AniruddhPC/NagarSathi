import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { queryClient } from "./lib/queryClient";
import "./index.css";

// Get Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Enhanced appearance for Clerk components
const clerkAppearance = {
  baseTheme: undefined,
  variables: {
    colorPrimary: "#3b82f6",
    colorBackground: "#0f172a",
    colorText: "#f1f5f9",
    colorTextSecondary: "#94a3b8",
    colorInputBackground: "#1e293b",
    colorInputText: "#f1f5f9",
    colorInputFocus: "#3b82f6",
    colorNeutral: "#334155",
    colorDanger: "#ef4444",
    colorSuccess: "#10b981",
    borderRadius: "0.75rem",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "1rem",
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    spacingUnit: "0.25rem",
  },
  elements: {
    rootBox: "w-full !max-w-[90%] mx-auto",
    card: "bg-dark-800 border border-dark-700 rounded-xl shadow-xl p-6 sm:p-8",
    headerTitle: "text-white text-2xl sm:text-3xl font-bold mb-2",
    headerSubtitle: "text-dark-400 text-sm sm:text-base mb-6",
    socialButtonsBlockButton:
      "bg-dark-700 hover:bg-dark-600 border border-dark-600 text-white transition-all duration-200 rounded-lg",
    socialButtonsBlockButtonText: "text-white font-medium",
    formFieldLabel: "text-dark-300 text-sm font-medium mb-2",
    formFieldInput:
      "bg-dark-800 border border-dark-600 text-white placeholder:text-dark-400 rounded-lg px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200",
    formButtonPrimary:
      "bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
    formButtonReset:
      "text-dark-400 hover:text-white transition-colors duration-200",
    footerActionLink:
      "text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200",
    footerActionText: "text-dark-400 text-sm",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-primary-400 hover:text-primary-300",
    formResendCodeLink: "text-primary-400 hover:text-primary-300",
    otpCodeFieldInput:
      "bg-dark-800 border border-dark-600 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
    dividerLine: "bg-dark-700",
    dividerText: "text-dark-400",
    alertText: "text-dark-300",
    formFieldErrorText: "text-red-400 text-sm mt-1",
    formFieldSuccessText: "text-green-400 text-sm mt-1",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={clerkPubKey} appearance={clerkAppearance}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ThemeProvider>
            <UserProvider>
              <NotificationProvider>
                <App />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#1e293b",
                      color: "#f1f5f9",
                      border: "1px solid #334155",
                    },
                    success: {
                      iconTheme: {
                        primary: "#10b981",
                        secondary: "#f1f5f9",
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: "#ef4444",
                        secondary: "#f1f5f9",
                      },
                    },
                  }}
                />
              </NotificationProvider>
            </UserProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
