import React from "react";
import styled from "styled-components";


const StyledInfoBox = styled.div`
    height: 200px;
    width: 100%;
    position: center;
    text-align: center;
    ${'' /* margin-top: 10px; */}
    ${'' /* margin-bottom: 10px; */}
`

export const ProfileInfo = (props) => {

    return (
        <StyledInfoBox>
            {props.children}
        </StyledInfoBox>
    )
}