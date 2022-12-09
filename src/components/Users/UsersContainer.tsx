import React from "react";
import { connect } from "react-redux";
// @ts-ignore
import { follow, unfollow, requestUsers, FilterType } from "../../redux/users-reducer.ts";
// @ts-ignore
import Users from "./Users.tsx";
import {
   getCurrentPage,
   getFollowingInProgress,
   getIsFetching,
   getPageSize,
   getTotalUsersCount,
   getUsers,
   getUsersFilter,
   // @ts-ignore
} from "../../redux/users-selectors.ts";
// @ts-ignore
import Preloader from "../common/Preloader/Preloader.tsx";
import { compose } from "redux";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
   currentPage: number;
   pageSize: number;
   isFetching: boolean;
   totalUsersCount: number;
   users: Array<UserType>;
   followingInProgress: Array<number>;
   filter: FilterType;
};

type MapDispatchPropsType = {
   getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
   unfollow: (userId: number) => void;
   follow: (userId: number) => void;
};

type OwnPropsType = {
   pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
   componentDidMount() {
      const { currentPage, pageSize, filter } = this.props;
      this.props.getUsers(currentPage, pageSize, filter);
   }

   onPageChanged = (pageNumber: number) => {
      const { pageSize, filter } = this.props;
      this.props.getUsers(pageNumber, pageSize, filter);
   };

   onFilterChanged = (filter: FilterType) => {
      const { pageSize } = this.props;
      this.props.getUsers(1, pageSize, filter);
   };

   render() {
      return (
         <>
            {this.props.isFetching ? (
               <Preloader />
            ) : (
               <Users
                  totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  onFilterChanged={this.onFilterChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  followingInProgress={this.props.followingInProgress}
               />
            )}
         </>
      );
   }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
      filter: getUsersFilter(state),
   };
};

export default compose(
   // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
   connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
      follow,
      unfollow,
      getUsers: requestUsers,
   }),
)(UsersContainer);
