import React, { FC } from "react";
// @ts-ignore
import Paginator from "../common/Paginator/Paginator.tsx";
// @ts-ignore
import User from "./User.tsx";
import { UserType } from "../../types/types";

type PropsType = {
   currentPage: number;
   totalUsersCount: number;
   pageSize: number;
   onPageChanged: (pageNumber: number) => void;
   users: Array<UserType>;
   followingInProgress: Array<number>;
   unfollow: () => void;
   follow: () => void;
};

let Users: FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
   return (
      <div>
         <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
         <div>
            {users.map((u) => (
               <User user={u} followingInProgress={props.followingInProgress} key={u.id} unfollow={props.unfollow} follow={props.follow} />
            ))}
         </div>
      </div>
   );
};

export default Users;