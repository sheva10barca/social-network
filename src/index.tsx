import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import SocialNetworkApp from "./App.tsx";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<SocialNetworkApp />);
