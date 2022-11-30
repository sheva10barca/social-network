import styles from "./Paginator.module.css";

let Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
   let pagesCount = Math.ceil(totalUsersCount / pageSize);

   let pages = [];
   for (let i = 1; i <= pagesCount; i++) {
      if (pages.length < 10) {
         pages.push(i);
      }
   }

   return (
      <div>
         {pages.map((p, id) => {
            return (
               <span
                  className={currentPage === p ? styles.selectedPage : ""}
                  onClick={(e) => {
                     onPageChanged(p);
                  }}
                  key={id}
               >
                  {p}
               </span>
            );
         })}
      </div>
   );
};

export default Paginator;
