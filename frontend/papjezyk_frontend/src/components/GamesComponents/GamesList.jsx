import React from "react";
import styled from "styled-components";
import { GameInfo } from "./GameInfo.jsx";
import { H2 } from "../general/Fonts.js";
import {handleUserData} from "../../handlers/profileHandlers";

const StyledGamesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  ${'' /* border: 1px solid; */}
  ${'' /* justify-content: center; */}
`

const StyledDescription = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 85%;
  justify-content: center;
  align-items: center;
  text-align: center;


  margin-left: 8%;
  margin-right: 5%;
  margin-top: 10px;
  margin-bottom: 10px;

`

export const GamesList = ({games, ...props}) => {


  React.useEffect( () => {
    async function getData() {
      const data = await handleUserData();
      console.log(data);
    }
    getData();
  }, [])

    return (
        <StyledGamesList>
            <StyledDescription>
                <div style={{width: "20%"}}>
                    <H2>GAME</H2>
                </div>
                <div style={{width: "15%"}}>
                    <H2>MIN/MAX PLAYERS</H2>
                </div>
                <div style={{width: "60%"}}>
                    <H2>DESCRIPTION</H2>
                </div>
                <div style={{width: "10%"}}>
                    <H2>ENTER</H2>
                </div>
            </StyledDescription>
            {games.map(game => (
                <GameInfo
                    name={game.name}
                    minPlayers={game.min_players}
                    maxPlayers={game.max_players}
                    description={game.description}/>
            ))}
        </StyledGamesList>
    )
}
