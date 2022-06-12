import React from "react";
import styled from "styled-components";
import { H2 } from "../general/Fonts";
import { ShowTables} from "./ShowTables";
import { CreateGameForm } from "../Forms";

const StyledGameBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    ${'' /* padding: 20px; */}
    height: 100px;
    border: 5px groove;
    justify-content: flex-start;
    align-items: center;


    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    transition: height 0.7s;

  overflow: hidden;

    .HeaderWrapper {
      width: 90%;
      height: 100px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-bottom: 40px;
    }


    .Name {
        width: 20%;
        ${'' /* background-color: lightgrey; */}
        ${'' /* border-radius: 10px; */}
        display: flex;
        justify-content: center;
    }

    .PlayersNumber{
        width: 15%;
        ${'' /* background-color: lightblue; */}
        ${'' /* border-radius: 10px; */}
        display: flex;
        justify-content: center;
        border-right: 2px dashed;
        border-left: 2px dashed;
    }

    .Description{
        width: 60%;
        ${'' /* background-color: lightgreen; */}
        ${'' /* border-radius: 10px; */}
        display: flex;
        justify-content: center;
        text-align: center;
        border-right: 2px dashed;
    }

    .ScrollButton {
        width: 0;
        height: 0;
        border: 30px solid transparent;
        background: transparent;
        cursor: pointer;
        transition: 0.7s;
    }

  .TablesWrapper {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }


`

export const GameInfo = ({name, minPlayers, maxPlayers, description, ...props}) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    const handleExpand = () => {
      if (!isExpanded) {
        setIsExpanded(true);
      }
      else {
        setIsExpanded(false);
      }
    }

    return (
        <StyledGameBox style={{height: isExpanded ? 500 : 100}}>
          <div className={'HeaderWrapper'}>
            <div className={"Name"}><H2>{name}</H2></div>
            <div className={"PlayersNumber"}><H2>{minPlayers}/{maxPlayers}</H2></div>
            <div className={"Description"}><H2>{description}</H2></div>
            <div
                className={"ScrollButton"}
                style={{
                  borderBottom: isExpanded ? "50px solid grey" : "0",
                  borderTop: isExpanded ? "0" : "50px solid grey"
                }}
                onClick={handleExpand}
            />
          </div>
          <div className={'TablesWrapper'}>
          <ShowTables
            gameName={name}
          />
            <div style={{width: 300}} >
            <CreateGameForm name={name} maxPlayers={maxPlayers} minPlayers={minPlayers}/>
            </div>
          </div>
        </StyledGameBox>
    )
}