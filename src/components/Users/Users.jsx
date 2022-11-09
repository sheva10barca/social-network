import styles from "./users.module.css";

const Users = (props) => {
   if (props.users.length === 0) {
      props.setUsers([
         {
            id: 1,
            photoUrl: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltbbf80d7ce2a0008d/6319189a23a56e3506fcbead/20220908_Robert_Lewandowski.jpg?auto=webp&fit=crop&format=jpg&height=800&quality=60&width=1200",
            followed: false,
            fullName: "Robert",
            status: "The Golden Boot winner",
            location: { city: "Warsaw", country: "Poland" },
         },
         {
            id: 2,
            photoUrl: "https://cdn.vox-cdn.com/thumbor/a-ws-MOJktqKR2-NXun-znce7nE=/0x0:4451x2967/1200x800/filters:focal(1353x0:2065x712)/cdn.vox-cdn.com/uploads/chorus_image/image/71189271/1242006667.0.jpg",
            followed: true,
            fullName: "Ter Stegen",
            status: "I'm the wall",
            location: { city: "Mönchengladbach", country: "Germany" },
         },
         {
            id: 3,
            photoUrl: "https://www.southcoastregister.com.au/images/transform/v1/crop/frm/silverstone-feed-data/d14b8a6d-fbe6-43d7-8228-9a4fd26fd9a7.jpg/r0_0_800_600_w800_h600_fmax.jpg",
            followed: true,
            fullName: "Pedri",
            status: "Magician",
            location: { city: "Bajamar", country: "Spain" },
         },
         {
            id: 4,
            photoUrl: "https://static.ua-football.com/img/upload/21/2a42ef.jpeg",
            followed: false,
            fullName: "Gavi",
            status: "The Golden Boy winner",
            location: { city: "Los Palacios y Villafranca", country: "Spain" },
         },
      ]);
   }

   return (
      <div>
         {props.users.map((u) => (
            <div key={u.id}>
               <span>
                  <div>
                     <img src={u.photoUrl} className={styles.userPhoto} alt="" />
                  </div>
                  <div>
                     {u.followed ? (
                        <button
                           onClick={() => {
                              props.unfollow(u.id);
                           }}
                        >
                           Unfollow
                        </button>
                     ) : (
                        <button
                           onClick={() => {
                              props.follow(u.id);
                           }}
                        >
                           Follow
                        </button>
                     )}
                  </div>
               </span>
               <span>
                  <span>
                     <div>{u.fullName}</div>
                     <div>{u.status}</div>
                  </span>
                  <span>
                     <div>{u.location.city}</div>
                     <div>{u.location.country}</div>
                  </span>
               </span>
            </div>
         ))}
      </div>
   );
};

export default Users;
