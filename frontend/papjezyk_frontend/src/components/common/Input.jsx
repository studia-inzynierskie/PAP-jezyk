import React from "react";
import styled from "styled-components";
import {B1, P2} from "../general/Fonts";
import { useField } from "formik";

const StyledInputWrapper = styled.div`
  width: 90%;
  height: 40px;
  margin: 10px;
  margin-inside: 0;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  .styledInput[type=text] {
    border: 2px solid gray;
    border-radius: 5px;
    margin: 0;
    width: 70%;
    height: 20px;
    font-size: 15px;
    transition: 0.5s;
    padding: 3px;
  }
  
  .styledInput[type=password] {
    border: 2px solid gray;
    border-radius: 5px;
    margin: 0;
    width: 70%;
    height: 20px;
    font-size: 15px;
    transition: 0.5s;
    
    padding: 3px;
  }
  
  .styledInput[type=text]:focus {
    outline: none;
    border: 2px solid black;
  }

  .styledInput[type=password]:focus {
    outline: none;
    border: 2px solid black;
  }
  
  .label {
    margin: 0;
  }
  
  .errorMessage {
    color: red;
    margin: 1px;
  }
`


export const Input = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <StyledInputWrapper>
            <B1 htmlFor={props.name} className={'label'}>{label}</B1>
            <input className={'styledInput'} {...field} {...props}/>
            {meta.touched && meta.error ? (
                <P2 className={'errorMessage'}>{meta.error}</P2>
            ) : null}
        </StyledInputWrapper>
    )
}