import React from "react";
import {H1, H2} from "../components/general/Fonts";
import {PageWrapper} from "../components/general/PageWrapper";
import { GamesList } from "../components/GamesComponents/GamesList";
import { handleGamesData } from "../handlers/gamesHandlers";

const game1 = { name: "Wojna",
                description: "Bardzo fajna gra polegajaca na rzucaniu w siebie kartami, stad nazwa 'Wojna'",
                min_players: 2,
                max_players: 4};
const game2 = { name: "Szachy",
                description: "Ogolnie to xd bo tej gry tu tak naprawde nie bedzie hehehehehe",
                min_players: 2,
                max_players: 2};

const games = [game1, game2, game1, game2]

const Games = () => {
    const [data, setData] = React.useState(null);

    React.useEffect( () => {
      async function getData() {
        const data = await handleGamesData();
        console.log(data);
        setData(data);
      }
      getData();
    }, [])

    if (data === null) {
        return (
            <PageWrapper>
              <H1> This is a games page </H1>
              <H2> Loading... </H2>
            </PageWrapper>
        )
      }


    return(
        <PageWrapper>
            <H1> This is a games page </H1>
            <GamesList games={data}/>
        </PageWrapper>
    )
}

export default Games