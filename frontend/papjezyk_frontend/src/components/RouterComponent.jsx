import { ShadowButton } from "./ShadowButton";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Games from "../pages/Games";
import Leaderboards from "../pages/Leaderboards";
import MainPage from "../pages/MainPage";
import UserProfile from "../pages/UserProfile";
import Table from "../pages/Table";
import LoginRegister from "../pages/LoginRegister";
import {Logo} from "./Logo";
import React from "react";
import styled from "styled-components";
import {B1} from "./general/Fonts";
import { isLoggedIn, handleLogout } from "../handlers/authHandlers";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
    min-width: 1200px;
  height: 80px;
  align-items: center;
  margin-left: 0;
  margin-right: 0;


  .Logo{
    width: 20%;
  }

  .navButtons{
    display: flex;
    width: 60%;
  }

  .loginRegister{
    display: flex;
    justify-content: end;
    align-items: center;
    width: 20%;

  }
`

export const RouterComponent = () => {
    const [loggedUser, setLoggedUser] = React.useState(false);

    React.useEffect(() => {
        async function checkLogged() {
            const logged = await(isLoggedIn());
            setLoggedUser(logged);
        }
        checkLogged();
    }, [])

    return (
        <>
            <Router>
                <StyledHeader>
                    <Logo className={"Logo"}/>
                    <div className={"navButtons"}>
                        <ShadowButton  path={"/games"}>
                            <B1> GAMES </B1>
                        </ShadowButton>
                        <ShadowButton  path={"/leaderboards"}>
                            <B1> LEADERBOARDS </B1>
                        </ShadowButton>
                        <ShadowButton  path={"/userprofile"}>
                            <B1> PROFILE </B1>
                        </ShadowButton>
                        <ShadowButton  path={"/table"}>
                            <B1> CURRENT GAME </B1>
                        </ShadowButton>
                    </div>
                    <div className={"loginRegister"}>
                        {
                            !loggedUser ?
                            <ShadowButton  path={"/login"}>
                                <B1> SIGN IN </B1>
                            </ShadowButton>
                                :
                                <ShadowButton
                                    onClick={async() => {await handleLogout().then(() => window.location.reload(false)) }}
                                    path={"/"}>
                                    <B1> SIGN OUT </B1>
                                </ShadowButton>
                        }
                    </div>
                </StyledHeader>

                <Routes>
                    <Route path={"/"}
                           element={<MainPage />}
                    />
                    <Route path={"/games"}
                           element={<Games />}
                    />
                    <Route path={"/leaderboards"}
                           element={<Leaderboards />}
                    />
                    <Route path={"/userprofile"}
                           element={<UserProfile />}
                    />
                    <Route path={"/table"}
                           element={<Table />}
                    />
                    <Route path={"login"}
                           element={<LoginRegister />}
                    />
                </Routes>
            </Router>
        </>
    )
};