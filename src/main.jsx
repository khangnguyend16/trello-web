// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";

// Cấu hình Redux Store
import { Provider } from "react-redux";
import { store } from "~/redux/store.js";

// Cấu hình react-router-dom với BrowserRouter
import { BrowserRouter } from "react-router-dom";

// Cấu hình Redux-Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);

// Kỹ thuật Inject Store: kỹ thuật cần khi cần sử dụng biến redux store ở các file ngoài phạm vi component
import { injectStore } from "./utils/authorizeAxios.js";
injectStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename="/">
        <CssVarsProvider theme={theme}>
          <ConfirmProvider
            defaultOptions={{
              allowClose: false,
              dialogProps: { maxWidth: "xs" },
              buttonOrder: ["confirm", "cancel"],
              confirmationButtonProps: { color: "secondary", variant: "outlined" },
              cancellationButtonProps: { color: "inherit" },
            }}
          >
            <GlobalStyles styles={{ a: { textDecoration: "none" } }} />
            {/* chuẩn hóa CSS để loại bỏ sự khác biệt về kiểu dáng giữa các trình duyệt. */}
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-left" theme="colored" />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
