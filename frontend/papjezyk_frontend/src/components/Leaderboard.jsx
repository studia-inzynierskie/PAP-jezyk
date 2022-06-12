import React from "react"
import styled from "styled-components";
import { B1, P1 } from "./general/Fonts";
import {handleUserData} from "../handlers/profileHandlers";
import {handleLeaderBoardsData} from "../handlers/leaderboardsHandlers";

const StyledRow = styled.div`
  height: 20px;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed black;
`

const StyledLeaderboard = styled.div`
  height: 345px;
  ${'' /* width: 300px; */}
  min-width: 250px;
  max-width: 400px;
  width: 30%;
  border: 2px solid black;
  border-radius: 10px;
  overflow: hidden;
  margin: 30px;

  .Header {
    height: 15px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-bottom: 2px solid black;
  }
`

const sampleData = {
    cols: ['nr', 'username', 'value'],
    val1: [1, 'magiczny_krzysiek', 200],
    val2: [2, 'magiczny_maciek', 198],
    val3: [3, 'niemagiczny_krzysiek', 100],
    val4: [4, 'magiczny_krzysiek', 200],
    val5: [5, 'magiczny_maciek', 198],
    val6: [6, 'niemagiczny_krzysiek', 100],
    val7: [7, 'magiczny_krzysiek', 200],
    val8: [8, 'magiczny_maciek', 198],
    val9: [9, 'niemagiczny_krzysiek', 100],
    val10: [10, 'niemagiczny_krzysiek', 100]
}


const sampleData2 = {
    list: [{username: 'magiczny_krzysiek',    value: 200},
           {username: 'magiczny_maciek',      value: 198}]
}

export const Leaderboard = ({ variant}) => {

    const [data, setData] = React.useState(null);

    let id_counter = 0;
    React.useEffect( () => {
        async function getData() {
            const data = await handleLeaderBoardsData(variant=variant);
            console.log(data);
            setData(data);
        }
        getData();
    }, [])


    const createRow = (row) => {
        console.log(row);
        id_counter += 1;
        return(
            <StyledRow>
                <P1> {id_counter} </P1>
                <P1> {row.username} </P1>
                <P1> {row.score} </P1>
            </StyledRow>
        )
    }

    const createRows = () => {
        console.log(data);
        let aux = []
        Object.values(data).forEach(val =>  aux.push(createRow(val)));
        return aux;
    }
    if (data === null)
        return(
            <StyledLeaderboard>
                <div className={'Header'}>
                    <B1> nr </B1>
                    <B1> username </B1>
                    <B1> {variant} </B1>
                </div>
                <B1> Loading... </B1>
            </StyledLeaderboard>
        )


    return(
        <StyledLeaderboard>
            <div className={'Header'}>
                <B1> nr </B1>
                <B1> username </B1>
                <B1> {variant} </B1>
            </div>
            {
                createRows()
            }
        </StyledLeaderboard>
    )
}
