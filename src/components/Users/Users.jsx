import React from "react";
import axios from "axios";

import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";

class Users extends React.Component {
   constructor(props) {
      super(props);
      if (props.users.length === 0) {
         axios.get("https://social-network.samuraijs.com/api/1.0/users").then((response) => {
            props.setUsers(response.data.items);
         });
      }
   }

   render() {
      return (
         <div>
            {this.props.users.map((u) => (
               <div key={u.id}>
                  <span>
                     <div>
                        <img
                           src={u.photos.small != null ? u.photos.small : userPhoto}
                           className={styles.userPhoto}
                           alt=""
                        />
                     </div>
                     <div>
                        {u.followed ? (
                           <button
                              onClick={() => {
                                 this.props.unfollow(u.id);
                              }}
                           >
                              Unfollow
                           </button>
                        ) : (
                           <button
                              onClick={() => {
                                 this.props.follow(u.id);
                              }}
                           >
                              Follow
                           </button>
                        )}
                     </div>
                  </span>
                  <span>
                     <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                     </span>
                     <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                     </span>
                  </span>
               </div>
            ))}
         </div>
      );
   }
}

export default Users;
