import React from "react";
import styled from "styled-components";
import {Card} from "./Card";
import {CardPile} from "./CardPile";
import {CardDisplay} from "./CardDisplay";
import {handleUserData} from "../../handlers/profileHandlers";
import {handleGameStructure, handleGameState, handleSendGameState} from "../../handlers/roomHandlers";
import { P1 } from "../general/Fonts";

const StyledGameBox = styled.div`
  width: 1200px;
  height: 600px;
  border: 2px solid black;
  align-self: center;
    display: flex;
    flex-wrap: wrap;

  .HorizontalPlayer {
    width: 800px;
    height: 150px;
    border: 2px dashed greenyellow;
    display: flex;
    align-self: center;
    margin-left: auto;
    margin-right: auto;
  }
`


export const GameBox = (props) => {

    const [gameStructure, setGameStructure] = React.useState(null);
    const [gameState, setGameState] = React.useState(null);
    const [gameOver, setGameOver] = React.useState(false);
    let interval = null;

    React.useEffect( () => {
        async function getStructure() {
            const structureData = await handleGameStructure();
            console.log('structure', structureData);
            setGameStructure(structureData);
        }
        async function getData() {

            const gameData = await handleGameState();
            console.log('game', gameData);
            setGameState(gameData);
        }
        getStructure();
        interval = setInterval(
            getData, 3000
        )

        return (
            () => clearInterval(interval)
        )
    }, []);



    const onDrop = async(e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        if (card_id === 'null')
            return
        const card = document.getElementById(card_id);

        if (e.target.id === props.perspective){
            console.log('sorting not allowed');
        }
        else{
            let move = card_id + " " + e.target.id;
            console.log('move: ', move);
            if (gameState.moves.indexOf(move) > -1) {
                const res = await handleSendGameState(move);
                console.log(res);
                setGameState(res);
            }
            // if move in data.moves => send to api
        }
    }

    const onDrag = (e) => {
        //console.log(e.clientX, e.clientY);
        e.preventDefault();
    };

    const createHiddenCards = (n, drag) => {
        const hidden = [];
        for (let i = 0; i < n; i++) {
            hidden.push(
                createFaceDown(drag)
            )
        }

        return hidden;
    }

    const createVisibleCards = (cards, drag) => {
        const visible = [];
        for (let i = 0; i < cards.length; i++) {
            visible.push(
                createFaceUp(drag, cards[i])
            )
        }

        return visible;
    }

    const createFaceDown = (drag) => (
        <Card id={''} faceUp={false} draggable={drag} />
    )

    const createFaceUp = (drag, id) => (
        <Card id={id} faceUp={true} draggable={drag} />
    )

    const createDisplays = () => {
        const finalArr = [];

        let keys = Object.keys(gameState.cards);
        for (let i = 0; i < keys.length; i++){
            if (gameStructure[keys[i]].is_deck) {
                finalArr.push(
                    <CardPile id={keys[i]} onDrop={onDrop} name={gameState.cards[keys[i]].name}>
                        {
                            gameState.cards[keys[i]].shown.length > 0 ?
                                createVisibleCards(gameState.cards[keys[i]].shown, gameState.cards[keys[i]].draggable)
                            :
                                createHiddenCards(gameState.cards[keys[i]].hidden, gameState.cards[keys[i]].draggable)
                        }
                    </CardPile>
                )
            }

            else {
                finalArr.push(
                    <CardDisplay id={keys[i]} onDrop={onDrop} name={gameState.cards[keys[i]].name}>
                        {
                            gameState.cards[keys[i]].shown.length > 0 ?
                            createVisibleCards(gameState.cards[keys[i]].shown, gameState.cards[keys[i]].draggable)
                                :
                                createHiddenCards(gameState.cards[keys[i]].hidden, gameState.cards[keys[i]].draggable)
                        }
                    </CardDisplay>
                )
            }

        }
        return finalArr;
    }

    if (gameState === null) {
        return (
        <P1>
            Game loading...
        </P1>
        )
    }
//    else if (gameState.moves.length === 0) {
//        return (
//            <P1>
//                Game finished!
//            </P1>
//        )
//    }

    return(
        <StyledGameBox
            onDragOver={onDrag}
            id={'test'}>
            {createDisplays()}

        </StyledGameBox>
    )
}
