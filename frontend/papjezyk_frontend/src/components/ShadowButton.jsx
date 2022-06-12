import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ShadowButtonStyled = styled.button`
  width: 164px;
  max-width: 164px;
  height: 40px;
  max-height: 40px;
  border: 0;
  border-radius: 50px;
  box-shadow: 0 3px 5px lightgray;
  background-color: inherit;
  transition: 0.5s;
  cursor: pointer;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover{
    background-color: lightgray;
  }
`

const NavLinkStyled = styled(NavLink)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  
`

export const ShadowButton = ({children, onClick, path}) => {
    return (
        <ShadowButtonStyled onClick={onClick}>
            <NavLinkStyled to={path}>
                {children}
            </NavLinkStyled>
        </ShadowButtonStyled>
    )
};

