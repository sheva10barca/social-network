import axios from "axios";
// @ts-ignore
import { UserType } from "../types/types.ts";

export const instance = axios.create({
   withCredentials: true,
   baseURL: "https://social-network.samuraijs.com/api/1.0/",
   headers: {
      "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3",
   },
});

export enum ResultCodesEnum {
   Success = 0,
   Error = 1,
}

export enum ResultCodeForCapcthaEnum {
   CaptchaIsRequired = 10,
}

export type GetItemsType = {
   items: Array<UserType>;
   totalCount: number;
   error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
   data: D;
   messages: Array<string>;
   resultCode: RC;
};
