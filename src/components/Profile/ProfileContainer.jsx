import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer.ts";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { compose } from "redux";
import { useEffect } from "react";

const ProfileContainer = (props) => {
   useEffect(() => {
      let userId = props.router.params.userId;
      if (!userId) {
         userId = props.authorizedUserId;
         if (!userId) {
            <Navigate to={"/login"} />;
         }
      }
      props.getUserProfile(userId);
      props.getStatus(userId);
      // eslint-disable-next-line
   }, [props.router.params.userId]);
   // debugger

   return (
      <Profile
         {...props}
         isOwner={!props.router.params.userId}
         profile={props.profile}
         status={props.status}
         updateStatus={props.updateStatus}
         savePhoto={props.savePhoto}
      />
   );
};

let mapStateToProps = (state) => {
   //console.log('mapStateToProps PROFILE')
   return {
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      authorizedUserId: state.auth.userId,
      isAuth: state.auth.isAuth,
   };
};

function withRouter(Component) {
   function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams(props.userId);
      return <Component {...props} router={{ location, navigate, params }} />;
   }
   return ComponentWithRouterProp;
}

export default compose(
   connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
   withRouter,
)(ProfileContainer);
