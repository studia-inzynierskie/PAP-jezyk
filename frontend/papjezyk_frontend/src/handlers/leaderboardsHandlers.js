

export async function handleLeaderBoardsData(variant){
    let endpoint = '/leaderboard';
    if (variant === 'level') {
        endpoint += '/by_level';
    }
    else if (variant === 'wins') {
        endpoint += '/by_wins';
    }
    else if (variant === 'achievements') {
        endpoint += '/by_achievements';
    }

    console.log(endpoint)
    const res = await fetch(endpoint);

    return res.json();
}