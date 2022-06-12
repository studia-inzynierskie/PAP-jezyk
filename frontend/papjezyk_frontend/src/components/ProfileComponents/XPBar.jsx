import React from "react";
import styled from "styled-components";
import { P1 } from "../general/Fonts";

const StyledBar = styled.div`
    clear: both;
    width: 100%;
    height: 50px;
    border-radius: 20px;
    background-color: lightgray;
    text-align: center;
`

const StyledProgressBar = styled.div`
    width: 80%;
    height: inherit;
    border-radius: 20px;
    background-color: gray;
    text-align: center;

`



export const XPBar = ({currentXP, nextXP, ...props}) => {

    const done = (currentXP/nextXP)*100
    return (
        <StyledBar>
            <StyledProgressBar style={{width: `${done}%`}}>
            </StyledProgressBar>
        </StyledBar>
    )
}