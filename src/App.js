import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from "./components/Login/Login";

import "./App.css";

function App() {
   return (
      <div className="app-wrapper">
         <HeaderContainer />
         <Navbar />
         <div className="app-wrapper-content">
            <Routes>
               <Route path="/dialogs/*" element={<DialogsContainer />} />
               <Route path="/profile/:userId" element={<ProfileContainer />} />
               <Route path="/profile/" element={<ProfileContainer />} />
               <Route path="/users/" element={<UsersContainer />} />
               <Route path="/login/" element={<LoginPage />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
