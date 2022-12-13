import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
// @ts-ignore
import { initializeApp } from "./redux/app-reducer.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import store from "./redux/redux-store.ts";
import { AppStateType } from "./redux/redux-store";
// @ts-ignore
import { UsersPage } from "./components/Users/UsersContainer.tsx";
// @ts-ignore
import { LoginPage } from "./components/Login/LoginPage.tsx";
import { Link } from "react-router-dom";
// @ts-ignore
import { Header } from "./components/Header/Header.tsx";

import "./App.css";
// @ts-ignore
import Preloader from "./components/common/Preloader/Preloader.tsx";
import { Layout } from "antd";
import Breadcrumb from "antd/es/breadcrumb";
import Menu, { MenuProps } from "antd/es/menu";
import { LaptopOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";



// @ts-ignore
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer.tsx"));
// @ts-ignore
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer.tsx"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = { initializeApp: () => void };
const { Content, Footer, Sider } = Layout;
export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label,
   } as MenuItem;
}

const itemsSideMenu: MenuItem[] = [
   getItem("My Profile", "MyProfile", <UserOutlined />, [
      getItem(<Link to="/profile">Profile</Link>, "Profile"),
      getItem(<Link to="/dialogs">Messages</Link>, "Messages"),
   ]),

   getItem("Developers", "Developers", <LaptopOutlined />, [
      getItem(<Link to="/developers">Developers list</Link>, "DevelopersList"),
      getItem(<Link to="/chat">Developers chat</Link>, "DevelopersChat"),
   ]),

   getItem("Settings", "Settings", <SettingOutlined />, [
      getItem(<Link to="/news">News</Link>, "News"),
      getItem(<Link to="/music">Music</Link>, "Music"),
   ]),
];
class App extends React.Component<MapPropsType & DispatchPropsType> {
   catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
      alert("Some error occured");
      //console.error(promiseRejectionEvent);
   };

   componentDidMount() {
      this.props.initializeApp();
      window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
   }

   componentWillUnmount() {
      window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
   }

   render() {
      return (
         <Layout >
            <Header />
            <Content style={{ padding: "0 50px" }}>
               <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>
                     <Link to="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                     <Link to="/developers">List</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
               </Breadcrumb>
               <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
                  <Sider className="site-layout-background" width={200}>
                     <Menu mode="inline" style={{ height: "100%" }} items={itemsSideMenu} />
                  </Sider>
                  <Content style={{ padding: "0 24px", minHeight: 280 }}>
                     <Suspense fallback={<Preloader />}>
                        <Routes>
                           <Route path="/dialogs/*" element={<DialogsContainer />} />
                           <Route path="/profile/" element={<ProfileContainer />} />
                           <Route path="/profile/:userId" element={<ProfileContainer />} />
                           <Route path="/" element={<Navigate to="/profile" />} />
                           <Route path="/developers" element={<UsersPage pageTitle={"Developers"} />} />
                           <Route path="/login/" element={<LoginPage />} />
                           <Route path="*" element={<div>404 NOT FOUND</div>} />
                        </Routes>
                     </Suspense>
                  </Content>
               </Layout>
            </Content>
            <Footer style={{ textAlign: "center", marginBottom: "10px" }}>
               <div className="created-by">
                  Developers Social Network ©2022 Created by Sheva</div>
            </Footer>
         </Layout>

         // <div className="app-wrapper">
         //    <HeaderContainer />
         //    <Navbar />
         //    <div className="app-wrapper-content">
         //       <Suspense
         //          fallback={
         //             <div>
         //                <Preloader />
         //             </div>
         //          }
         //       >
         //          <Routes>
         //             <Route path="/dialogs/*" element={<DialogsContainer />} />
         //             <Route path="/profile/" element={<ProfileContainer />} />
         //             <Route path="/profile/:userId" element={<ProfileContainer />} />
         //             <Route path="/" element={<Navigate to="/profile" />} />
         //             <Route path="/users/" element={<UsersPage pageTitle={"Самураи"} />} />
         //             <Route path="/login/" element={<LoginPage />} />
         //             <Route path="*" element={<div>404 NOT FOUND</div>} />
         //          </Routes>
         //       </Suspense>
         //    </div>
         // </div>
      );
   }
}

const mapStateToProps = (state: AppStateType) => ({
   initialized: state.app.initialized,
});

function withRouter(Component) {
   function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
   }

   return ComponentWithRouterProp;
}

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SocialNetworkApp: React.FC = () => {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <AppContainer />
         </Provider>
      </BrowserRouter>
   );
};

export default SocialNetworkApp;
