import React from "react";
import styled from "styled-components";
import {P1} from "../general/Fonts";


const StyledCardDisplay = styled.div`
    justify-self: flex-end;
  width: 450px;
  height: 180px;
  border: 2px dashed greenyellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-left: 10px;
  margin-right: 10px;
  overflow: hidden;
  
  .ViewDropWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  
  .ViewWindowWrapper {
    width: 300px;
    overflow: hidden;
  }
  
  .ViewWindow {
    align-items: center;
    display: flex;
    transition: transform 0.5s;
    white-space: nowrap;
    padding-left: 0;
  }
  
  .DropBox {
    width: 100px;
    height: 130px;
    border-radius: 10px;
    margin: 10px;
    border: 2px black dashed;

    text-align: center;
  }
  
  .ControlsNameWrapper {
    margin: 0 20px 0 20px;
    width: 90%;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
`
// TODO zamienic children na liste i robic map
export const CardDisplay = ({children, onDrop, id, name, ...args}) => {
    const [currentTranslate, setCurrentTranslate] = React.useState(0);
    const [isOverDropbox, setIsOverDropbox] = React.useState(false);


    const changeTranslate = (value) => {
        if (currentTranslate < 0 && value > 0) {
            setCurrentTranslate(currentTranslate + 200)
        }
        else if (currentTranslate > -(100 * children.length - 200) && value < 0) {
            setCurrentTranslate(currentTranslate - 200)
        }
    }

    return (
        <StyledCardDisplay {...args} onDrop={onDrop} id={id}>
            <div className={'ViewDropWrapper'}>
            <div className={'ViewWindowWrapper'}>
                <div className={'ViewWindow'} style = {{transform: `translateX(${currentTranslate}px)`}} onDrop={onDrop} id={id}>
                    {children}
                </div>
            </div>
                <div className={'DropBox'}
                     id = {id}
                     onDragEnter={() => setIsOverDropbox(true)}
                     onDragLeave={() => setIsOverDropbox(false)}
                >
                    <P1 id={id}>
                        put cards here
                    </P1>
                </div>
            </div>
            <div className={'ControlsNameWrapper'}>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <button onClick={() => changeTranslate(200)}>{'<'}</button>
                    <button onClick={() => changeTranslate(-200)}>{'>'}</button>
                </div>
                <P1>
                    {name}
                </P1>
            </div>
        </StyledCardDisplay>
    )
}