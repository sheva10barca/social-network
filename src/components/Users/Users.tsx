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
import { useSearchParams } from "react-router-dom";

type PropsType = {};

export const Users: FC<PropsType> = (props) => {
   const users = useSelector(getUsers);
   const totalUsersCount = useSelector(getTotalUsersCount);
   const currentPage = useSelector(getCurrentPage);
   const pageSize = useSelector(getPageSize);
   const filter = useSelector(getUsersFilter);
   const followingInProgress = useSelector(getFollowingInProgress);

   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();

   useEffect(() => {
      const result: any = {};
      for (const [key, value] of searchParams.entries()) {
         let value2: any = +value;
         if (isNaN(value2)) {
            value2 = value;
         }
         if (value === "true") {
            value2 = true;
         } else if (value === "false") {
            value2 = false;
         }
         result[key] = value2;
      }

      let actualPage = result.page || currentPage;
      let term = result.term || filter.term;

      let friend = result.friend || filter.friend;
      if (result.friend === false) {
         friend = result.friend;
      }

      const actualFilter = { friend, term };

      dispatch(requestUsers(actualPage, pageSize, actualFilter));
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      const term = filter.term;
      const friend = filter.friend;

      let urlQuery =
         (term === "" ? "" : `&term=${term}`) +
         (friend === null ? "" : `&friend=${friend}`) +
         (currentPage === 1 ? "" : `&page=${currentPage}`);

      setSearchParams(urlQuery);
      // eslint-disable-next-line
   }, [filter, currentPage]);

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
