

export async function handleGamesData() {
    const res = await fetch('/game/');

    return res.json();
}

export async function handleActiveMatches(gameName) {
    let endpoint = `/game/${gameName}/rooms`;

    const res = await fetch(endpoint);

    return res.json();

}
