import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
   if (!profile) {
      return <Preloader />;
   }

   const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
         savePhoto(e.target.files[0]);
      }
   };

   return (
      <div>
         <div className={s.content}></div>
         <div className={s.descriptionBlock}>
            <p>{profile.fullName}</p>
            <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt="" />
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            <p>{profile.aboutMe}</p>
         </div>
      </div>
   );
};

export default ProfileInfo;
