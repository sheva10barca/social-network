import React from "react";
// @ts-ignore
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
// @ts-ignore
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";
import { ProfileType } from "../../types/types";

type PropsType = {
   savePhoto: (file: File) => void;
   isOwner: boolean;
   profile: ProfileType | null;
   status: string;
   saveProfile: (profile: ProfileType) => void;
   updateStatus: (status: string) => void;
};

const Profile: React.FC<PropsType> = (props) => {
   return (
      <div>
         <ProfileInfo
            savePhoto={props.savePhoto}
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            saveProfile={props.saveProfile}
            updateStatus={props.updateStatus}
         />
         <MyPostsContainer />
      </div>
   );
};

export default Profile;
