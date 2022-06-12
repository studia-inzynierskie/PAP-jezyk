import React from "react"
import styled from "styled-components";
import { Leaderboard } from "./Leaderboard";
import { B2 } from "./general/Fonts";

const StyledLeaderboardList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;

`

export const LeaderboardList = ({variants, ...props}) => {

    const createLeaderboard = (row) => {
        return(
            <div style={{textAlign: 'center'}}>
                <B2>{row}</B2>
                <Leaderboard variant={row} />
            </div>
        )
    }

    const createLeaderboards = () => {
        let aux = []
        Object.values(variants).forEach(val => aux.push(createLeaderboard(val)));
        return aux;
    }

    return(
        <StyledLeaderboardList>
        {
            createLeaderboards()
        }
        </StyledLeaderboardList>
    )

}