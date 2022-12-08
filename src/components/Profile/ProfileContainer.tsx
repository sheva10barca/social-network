import React from "react";
// @ts-ignore
import Profile from "./Profile.tsx";
import { connect } from "react-redux";
// @ts-ignore
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer.ts";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { compose } from "redux";
import { useEffect } from "react";
import { ProfileType } from "../../types/types";
import { RouteComponentProps } from "react-router";
import { AppStateType } from "../../redux/redux-store";

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
   getUserProfile: (userId: number) => void;
   getStatus: (userId: number) => void;
   updateStatus: (status: string) => void;
   savePhoto: (file: File) => void;
   saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
   userId: string;
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

const ProfileContainer: React.FC<PropsType> = (props: PropsType) => {
   useEffect(() => {
      let userId: number | null = +props.router.params.userId;
      if (!userId) {
         userId = props.authorizedUserId;
         if (!userId) {
            <Navigate to={"/login"} />;
         }
      }

      if (!userId) {
         console.error("ID should exists in URI params or in state ('authorizedUserId')");
      } else {
         props.getUserProfile(userId);
         props.getStatus(userId);
      }
      // props.getUserProfile(userId);
      // props.getStatus(userId);
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

let mapStateToProps = (state: AppStateType) => {
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

export default compose<React.ComponentType>(
   connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
   withRouter,
)(ProfileContainer);
