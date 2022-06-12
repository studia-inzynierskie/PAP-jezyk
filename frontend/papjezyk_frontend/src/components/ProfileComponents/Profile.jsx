import React from "react";
import styled from "styled-components";
import {H2} from "../general/Fonts";
import { ProfileImage } from "./ProfileImage";
import { ProfileInfo } from "./ProfileInfo";
import { AchievementsList } from "./AchievementsList";
import { XPBar } from "./XPBar";
import { ProfileStatistics } from "./ProfileStats";

const StyledProfile = styled.div`
  width: 100%;
  height: 600px;
  border: 2px solid black;
  align-self: center;
  display: flex;
  flex-flow: row wrap;
  padding: 10px;

`

export const ProfileBox = ({imgSource, name, email, lvl, exp, maxExp, achievements, stats, ...props}) => {

    return(
        <StyledProfile>
            <div style={{width: "50%", maxHeight: "300px"}}>
              <XPBar currentXP={exp+0.05*maxExp} nextXP={maxExp*1.05} />
              <ProfileImage src={imgSource} alt={"profilowe nie dziala"}/>
              <ProfileInfo>
                <H2>USERNAME : {name}</H2>
                <H2>EMAIL : {email}</H2>
                <H2>LVL : {lvl}</H2>
              </ProfileInfo>
            </div>
            <AchievementsList achievements={achievements} />
            <ProfileStatistics stats={stats} />

        </StyledProfile>
    )
}


// {isVisible && (<komponent>)
//
//}
//
{/* <div className={"AchievementList"}>
  {userAchievements.map(achievement => (
    <div className={`AchievementBox ${achievement === 'jabko' ? "AchievementBoxUnlocked" : ""}`}>
      <P1>{achievement}</P1>
    </div>
  ))}
</div> */}
