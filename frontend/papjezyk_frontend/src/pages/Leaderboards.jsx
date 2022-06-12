import {H1} from "../components/general/Fonts";
import {PageWrapper} from "../components/general/PageWrapper";
import { Leaderboard } from "../components/Leaderboard";
import { LeaderboardList } from "../components/LeaderboardList";

const Leaderboards = () => {
    const variants = ["level", "wins", "achievements"]
    return(
        <PageWrapper>
            <H1> This is a leaderboards page </H1>
            <LeaderboardList variants={variants} />
        </PageWrapper>
    )
}

export default Leaderboards