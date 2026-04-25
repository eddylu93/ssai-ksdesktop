import ReactDOM from "react-dom/client";
import { App, ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import AppRoot from "./App";
import "./index.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorBgBase: "#0F0F10",
        colorTextBase: "#E5E5E7",
        colorPrimary: "#4EA1FF",
        borderRadius: 10
      }
    }}
  >
    <App>
      <AppRoot />
    </App>
  </ConfigProvider>
);
