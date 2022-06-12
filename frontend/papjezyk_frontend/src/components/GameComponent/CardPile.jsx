import React from "react";
import styled from "styled-components";
import { P1 } from "../general/Fonts";


const StyledCardPile = styled.div`
  justify-self: flex-start;
  width: 225px;
  height: 180px;
  border: 2px dashed red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: center;
  margin-right: 10px;
  margin-left: 10px;
  
  .ContentWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
  
  .DropBox {
    width: 100px;
    height: 130px;
    border-radius: 10px;
    margin: 10px;
    border: 2px black dashed;

    text-align: center;
  }

`

export const CardPile = ({children, id, name, ...args}) => {

    return (
        <StyledCardPile {...args} >
          <div className={'ContentWrapper'}>
            {children}
            <div className={'DropBox'} id={id}>
                <P1 id={id}>
                    put cards here
                </P1>
            </div>
          </div>
          <P1 style={{margin: '0 5px 5px 0'}}> {name} </P1>
        </StyledCardPile>
    )
}