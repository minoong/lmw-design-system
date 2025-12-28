import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@lmw-design-system/themes";
import App from "./App";

// Import design system SCSS
import "@lmw-design-system/tokens/scss";
import "@lmw-design-system/typography/scss";
import "@lmw-design-system/themes/scss/light";
import "@lmw-design-system/themes/scss/dark";
import "@lmw-design-system/components/css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
