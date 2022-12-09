import React, { Suspense } from "react";
// @ts-ignore
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
// @ts-ignore
import Navbar from "./components/Navbar/Navbar.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
// @ts-ignore
import { initializeApp } from "./redux/app-reducer.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import store from "./redux/redux-store.ts";
import { AppStateType } from "./redux/redux-store";
// @ts-ignore
import { UsersPage } from "./components/Users/UsersContainer.tsx";
// @ts-ignore
import { LoginPage } from "./components/Login/LoginPage.tsx";

import "./App.css";
// @ts-ignore
import Preloader from "./components/common/Preloader/Preloader.tsx";

// @ts-ignore
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer.tsx"));
// @ts-ignore
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer.tsx"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = { initializeApp: () => void };

class App extends React.Component<MapPropsType & DispatchPropsType> {
   catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
      alert("Some error occured");
      //console.error(promiseRejectionEvent);
   };

   componentDidMount() {
      this.props.initializeApp();
      window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
   }

   componentWillUnmount() {
      window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
   }

   render() {
      if (!this.props.initialized) {
         return <Preloader />;
      }
      return (
         <div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <div className="app-wrapper-content">
               <Suspense
                  fallback={
                     <div>
                        <Preloader />
                     </div>
                  }
               >
                  <Routes>
                     <Route path="/dialogs/*" element={<DialogsContainer />} />
                     <Route path="/profile/" element={<ProfileContainer />} />
                     <Route path="/profile/:userId" element={<ProfileContainer />} />
                     <Route path="/" element={<Navigate to="/profile" />} />
                     <Route path="/users/" element={<UsersPage pageTitle={"Самураи"} />} />
                     <Route path="/login/" element={<LoginPage />} />
                     <Route path="*" element={<div>404 NOT FOUND</div>} />
                  </Routes>
               </Suspense>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state: AppStateType) => ({
   initialized: state.app.initialized,
});

function withRouter(Component) {
   function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
   }

   return ComponentWithRouterProp;
}

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SocialNetworkApp: React.FC = () => {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <AppContainer />
         </Provider>
      </BrowserRouter>
   );
};

export default SocialNetworkApp;
