import React from "react";
import styled from "styled-components";
import { P1 } from "../general/Fonts";

const StyledAchievementsList = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 250px;
    overflow: auto;

`

const StyledAchievementBox = styled.div`
    background: lightgray;
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 25px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;

    .Unlocked{
        background-color: green;
    }

    .Blocked{
        background-color: lightgray;
    }

    .HoverText {
        position: relative;
        ${'' /* border-bottom: 1px dotted black; */}
    }

    .HoverText:before {
        content: attr(data-hover);
        visibility: hidden;
        opacity: 0.2;
        width: 140px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 10px;
        padding: 5px 0;
        transition: opacity 1s ease-in-out;

        position: absolute;
        z-index: 1;
        left: 0;
        top: 100%;
    }

    .HoverText:hover:before {
        opacity: 1;
        visibility: visible;
    }

`

export const AchievementsList = ({achievements, ...props}) => {
  console.log('achv', achievements);

    return (
        <StyledAchievementsList>
            {achievements.map(achiev =>(
                <AchievementBox
                    achievement={achiev}
                />
            ))}
        </StyledAchievementsList>
    )
}

const AchievementBox = ({achievement, ...props}) => {

    return (
        <StyledAchievementBox style={{backgroundColor: achievement.achieved ? 'yellow' : 'lightgrey'}}>
            <span className="HoverText" data-hover={achievement.description}>
                {achievement.name}
            </span>
        </StyledAchievementBox>
    )
}
