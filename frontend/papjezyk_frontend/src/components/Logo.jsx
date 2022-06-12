import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {H1} from "./general/Fonts";
import jezyk from "../img/hedgehog.png";

const StyledLogo = styled.img`
    width: 50%;
    margin-left: 30px;
    max-width: 100px;
    min-width: 50px;
`

export const Logo = () => {

    return(
        <div style={{width: "15%", marginLeft: 20}}>
            <NavLink to={"/"} style={{color: "black", textDecoration: "none"}}>
                {/* <H1> LOGO HERE </H1> */}
                <StyledLogo src={jezyk} alt="LOGO HERE"/>
            </NavLink>
        </div>
    )
}

