import React, { FC, useEffect } from "react";
// @ts-ignore
import Paginator from "../common/Paginator/Paginator.tsx";
// @ts-ignore
import User from "./User.tsx";
// @ts-ignore
import { UsersSearchForm } from "./UsersSearchForm.tsx";
import { useSelector } from "react-redux";
import {
   getCurrentPage,
   getFollowingInProgress,
   getPageSize,
   getTotalUsersCount,
   getUsers,
   getUsersFilter,
   // @ts-ignore
} from "../../redux/users-selectors.ts";
import { useDispatch } from "react-redux";
// @ts-ignore
import { FilterType, requestUsers } from "../../redux/users-reducer.ts";

type PropsType = {};

export const Users: FC<PropsType> = (props) => {
   const users = useSelector(getUsers);
   const totalUsersCount = useSelector(getTotalUsersCount);
   const currentPage = useSelector(getCurrentPage);
   const pageSize = useSelector(getPageSize);
   const filter = useSelector(getUsersFilter);
   const followingInProgress = useSelector(getFollowingInProgress);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(requestUsers(currentPage, pageSize, filter));
   }, []);

   const onPageChanged = (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, filter));
   };

   const onFilterChanged = (filter: FilterType) => {
      dispatch(requestUsers(1, pageSize, filter));
   };
   const follow = (userId: number) => {
      dispatch(follow(userId));
   };
   const unfollow = (userId: number) => {
      dispatch(unfollow(userId));
   };

   return (
      <div>
         <UsersSearchForm onFilterChanged={onFilterChanged} />
         <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
         <div>
            {users.map((u) => (
               <User user={u} followingInProgress={followingInProgress} key={u.id} unfollow={unfollow} follow={follow} />
            ))}
         </div>
      </div>
   );
};
