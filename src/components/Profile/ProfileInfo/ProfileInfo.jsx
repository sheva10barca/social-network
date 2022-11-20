import React from "react";
import ProfileStatus from "./ProfileStatus";

import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
   if (!props.profile) {
      return <Preloader />;
   }
   return (
      <div>
         <div className={s.content}>
            {/* <img
               src="https://static.maiutazas.hu/uploads/mu_campaign/2/1/8/_/218079_5369ab0620d65a13ab192053829d91f0577edd4d_original.jpg"
               alt=""
            /> */}
         </div>
         <div className={s.descriptionBlock}>
            <p>{props.profile.fullName}</p>
            <img src={props.profile.photos.large} alt="" />
            <ProfileStatus status={"Hello my amigos"} />
            <p>{props.profile.aboutMe}</p>
         </div>
      </div>
   );
};

export default ProfileInfo;
