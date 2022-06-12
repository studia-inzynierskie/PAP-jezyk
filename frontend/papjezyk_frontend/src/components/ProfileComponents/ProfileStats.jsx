import React from "react";
import styled from "styled-components";
import {H2, B2} from "../general/Fonts";


const StyledStatsList = styled.div`
  width: 100%;
  max-height: 300px;
  align-self: center;
  display: flex;
  justify-content: space-evenly;
`

const StyledStats = styled.div`
  min-width: 15%;
  max-width: 20%;
  display: flex;
  flex-flow: column;
  ${'' /* align-items: center; */}
  text-align: center;

`

export const ProfileStatistics = ({stats, ...props}) => {
    return (
        <StyledStatsList>
            {stats.map(stat =>(
                <StyledStats>
                    <H2>{stat.name}</H2>
                    <B2>{stat.value}</B2>
                </StyledStats>
            ))}
        </StyledStatsList>
    )
}