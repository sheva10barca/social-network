import React, { Suspense } from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import store from "./redux/redux-store";

import "./App.css";
import Preloader from "./components/common/Preloader/Preloader";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
   catchAllUnhandledErrors = (reason, promise) => {
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
                     <Route path="/users/" element={<UsersContainer />} />
                     <Route path="/login/" element={<LoginPage />} />
                     <Route path="*" element={<div>404 NOT FOUND</div>} />
                  </Routes>
               </Suspense>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
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

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SocialNetworkApp = (props) => {
   return (
      <HashRouter>
         <Provider store={store}>
            <AppContainer />
         </Provider>
      </HashRouter>
   );
};

export default SocialNetworkApp;
