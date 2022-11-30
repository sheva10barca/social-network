import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = ({ profile, status, updateStatus }) => {
   if (!profile) {
      return <Preloader />;
   }
   return (
      <div>
         <div className={s.content}></div>
         <div className={s.descriptionBlock}>
            <p>{profile.fullName}</p>
            <img src={profile.photos.large} alt="" />
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            <p>{profile.aboutMe}</p>
         </div>
      </div>
   );
};

export default ProfileInfo;
