import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./StoreContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderEntireTree = () => {
   root.render(
      <React.StrictMode>
         <BrowserRouter>
            <Provider store={store}>
               <App />
            </Provider>
         </BrowserRouter>
      </React.StrictMode>,
   );
};

rerenderEntireTree();

store.subscribe(() => {
   rerenderEntireTree();
});
