// @ts-ignore
import { APIResponseType, GetItemsType, instance } from "./api.ts";

export const usersAPI = {
   getUsers(currentPage = 1, pageSize = 10, term: string = "", friend: null | boolean = null) {
      return instance
         .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`))
         .then((res) => {
            return res.data;
         });
   },
   follow(userId: number) {
      return instance.post<APIResponseType>(`follow/${userId}`).then((res) => res.data);
   },
   unfollow(userId: number) {
      return instance.delete(`follow/${userId}`).then((res) => res.data) as Promise<APIResponseType>;
   },
};
