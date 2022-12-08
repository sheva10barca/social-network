import React from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import s from "./Header.module.css";

export type MapPropsType = {
   isAuth: boolean;
   login: string | null;
};
export type DispatchPropsType = {
   logout: () => void;
};

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
   return (
      <header className={s.header}>
         <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg" alt="" />
         <div className={s.loginBlock}>
            {props.isAuth ? (
               <div>
                  {props.login} - <button onClick={props.logout}>Log out</button>{" "}
               </div>
            ) : (
               <NavLink to={"/login"}>Login</NavLink>
            )}
         </div>
      </header>
   );
};

export default Header;
