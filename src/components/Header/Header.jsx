import React from "react";

import s from './Header.module.css';

const Header = () => {
   return (
      <header className={s.header}>
         <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg"
            alt=""
         />
      </header>
   );
};

export default Header;
