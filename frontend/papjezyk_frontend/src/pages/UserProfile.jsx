import {H1, H2} from "../components/general/Fonts";
import {PageWrapper} from "../components/general/PageWrapper";
import {ProfileBox} from "../components/ProfileComponents/Profile";
import profilowe from "../img/profile.jpeg";
import { handleUserData } from "../handlers/profileHandlers";
import React from "react";

const UserProfile = () => {
  const [data, setData] = React.useState(null);

    React.useEffect( () => {
      async function getData() {
        const data = await handleUserData();
        setData(data);
      }
      getData();
    }, [])

    if (data === null) {
      return (
          <PageWrapper>
            <H1> This is a profile page </H1>
            <H2> Unfortunately you can't see it, because you are not logged in. Do it now!</H2>
          </PageWrapper>
      )
    }

    return(
        <PageWrapper>
            <H1> This is a profile page </H1>
            <ProfileBox
                imgSource = {profilowe}
                name = {data.username}
                email = {data.email}
                lvl = {data.lvl}
                exp = {data.exp}
                maxExp = {data.max_exp}
                achievements = {data.achievements}
                stats = {data.stats}
                />
        </PageWrapper>
    )
}

export default UserProfile