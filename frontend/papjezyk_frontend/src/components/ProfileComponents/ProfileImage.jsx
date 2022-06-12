import React from "react";
import styled from "styled-components";


const StyledImage = styled.img`
    float: left;
    border: 5px solid black;
    width: 200px;
    opacity: 1;
    height: 200px;
    border-radius: 80px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const ProfileImage = ({src, alt}) => {
    return (
        <StyledImage src={src} alt={alt}></StyledImage>
    )
}