import React from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/auth-selectors.ts";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// @ts-ignore
import { logout } from "../../redux/auth-reducer.ts";
import { UserOutlined } from '@ant-design/icons'
// @ts-ignore
export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
   const isAuth = useSelector(selectIsAuth);
   const login = useSelector(selectCurrentUserLogin);

   const dispatch = useDispatch();

   const logoutCallback = () => {
      dispatch(logout());
   };
 
   const { Header } = Layout;
   return (
      <Header className="header">
         <Row>
            <Col span={22}>
               <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                  <Menu.Item key="1">
                     <Link to="/developers">Developers</Link>
                  </Menu.Item>
               </Menu>
            </Col>
            {isAuth ? (
               <>
                  {" "}
                  <Col span={1}>
                     <Avatar alt={login || ''} style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                  </Col>
                  <Col span={1}>
                     <Button onClick={logoutCallback}>Log out</Button>
                  </Col>
               </>
            ) : (
               <Col span={2}>
                  <Button>
                     <Link to={"/login"}>Log in</Link>
                  </Button>
               </Col>
            )}
         </Row>
      </Header>

      // <header className={s.header}>
      //    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg" alt="" />
      //    <div className={s.loginBlock}>
      //       {props.isAuth ? (
      //          <div>
      //             {props.login} - <button onClick={props.logout}>Log out</button>{" "}
      //          </div>
      //       ) : (
      //          <NavLink to={"/login"}>Login</NavLink>
      //       )}
      //    </div>
      // </header>
   );
};

// export default Header;
