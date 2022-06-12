import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  min-width: 90px;
  height: 140px;
  margin: 5px;
  user-select: none;

  
  .faceUp {
    width: 90%;
    height: 90%;
    padding: 5px;
    background-color: lightblue;
    border: 2px solid black;
    border-radius: 10px;
  }

  .faceDown {
    height: 90%;
    width: 90%;
    padding: 5px;
    background-color: darkblue;
    border: 2px solid black;
    border-radius: 10px;
  }
`

export const Card = (props) => {


    const onDragStart = (e) => {
        if (props.draggable) {
            const target = e.target;
            e.dataTransfer.setData("card_id", target.id);
        }
        else{
            e.dataTransfer.setData("card_id", 'null');
            e.preventDefault();
        }
    }

    const onDrag = (e) => {
        e.stopPropagation();
    }
    return(
        <CardWrapper
            id={props.id}
            draggable={props.draggable}
            onDragOver = {onDrag}
            onDragStart = {onDragStart}
            parent_id = {props.parent_id}
        >
            <div className={props.faceUp ? 'faceUp' : 'faceDown'} style={{cursor: props.draggable && 'pointer'}}>
                {props.faceUp && <span> {props.id} </span>}
            </div>
        </CardWrapper>
    )
}


