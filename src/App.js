import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from "./components/Login/Login";

import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";

import "./App.css";
import Preloader from "./components/common/Preloader/Preloader";

import { useLocation, useNavigate, useParams } from "react-router-dom";

class App extends React.Component {
   componentDidMount() {
      this.props.initializeApp();
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
               <Routes>
                  <Route path="/dialogs/*" element={<DialogsContainer />} />
                  <Route path="/profile/:userId" element={<ProfileContainer />} />
                  <Route path="/profile/" element={<ProfileContainer />} />
                  <Route path="/users/" element={<UsersContainer />} />
                  <Route path="/login/" element={<LoginPage />} />
               </Routes>
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

export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
