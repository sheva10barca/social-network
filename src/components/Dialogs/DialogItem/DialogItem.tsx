import React from "react";
// @ts-ignore
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
   id: number;
   name: string;
};

const DialogItem: React.FC<PropsType> = (props) => {
   let path = "/dialogs/" + props.id;

   return (
      <div className={s.dialogItem}>
         <div className={s.avatar}>
            <img
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
               alt=""
            />
         </div>
         <NavLink to={path}>{props.name}</NavLink>
      </div>
   );
};

export default DialogItem;
