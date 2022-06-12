import {H1} from "../components/general/Fonts";
import {PageWrapper} from "../components/general/PageWrapper";
import { GameBox } from "../components/GameComponent/GameBox";

const Table = () => {

    return(
        <PageWrapper>
            <H1> This is a current game (table) page </H1>
            <GameBox perspective = {'P1'}/>
        </PageWrapper>
    )
}

export default Table