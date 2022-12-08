import React from "react";
// @ts-ignore
import s from "./Post.module.css";

type PropsType = {
   message: string
   likesCount: number
}

const Post = (props: PropsType) => {
   return (
      <div className={s.item}>
         <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png"
            alt=""
         />
         {props.message}
         <div>
            <span>likes</span> {props.likesCount}
         </div>
      </div>
   );
};

export default Post;
