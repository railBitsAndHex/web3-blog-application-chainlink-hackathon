import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Routes } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root"));
const moralisSUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const moralisAppId = process.env.REACT_APP_MORALIS_APPID;

root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={moralisSUrl} appId={moralisAppId}>
      <Routes>
        <App />
      </Routes>
    </MoralisProvider>
  </React.StrictMode>
);