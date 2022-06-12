import React from "react"
import styled from "styled-components";
import {B1, P1} from "../general/Fonts";
import {Input } from "../common/Input";
import {handleJoinRoom} from "../../handlers/roomHandlers";
import {handleUserData} from "../../handlers/profileHandlers";
import {handleActiveMatches} from "../../handlers/gamesHandlers";
import {Navigate} from "react-router-dom";

const StyledRow = styled.div`
  height: 20px;
  display: flex;
  padding: 5px;
  width: 98%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed black;
  font-family: 'Poppins', sans-serif;
  
  .PasswordInput {
    width: 80px;
    border: 1px solid gray;
    border-radius: 5px;
    transition: 0.5s;
  }
  
  .PasswordInput:focus {
    outline: none;
    border: 1px solid black;
  }
  
  .NameContainer {
    width: 100px;
  }
  
  .JoinButton {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left: 10px solid black;
    border-right: 0;
    background: transparent;
    margin-right: 20px;
    cursor: pointer;
    
    transition: opacity 0.5s;
  }
  
  .JoinButton:hover {
    opacity: 0.7;
  }
  
  .JoinButtonClosed {
    width: 10px;
    height: 10px;
    margin-right: 20px;
    background-color: black;
  }
`

const StyledList = styled.div`
  height: 300px;
  width: 400px;
  border: 2px solid black;
  border-radius: 10px;
  
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
  cols: ['nr', 'table name', 'password', 'join'],
  val1: [1, 'asd', true, true],
  val2: [2, 'asdf', false, true],
  val3: [3, 'asdfg', true, false]
}


const sampleData2 = {
  data: [{'username': 'magiczny_krzysiek',    'value': 200},
    {'username': 'magiczny_maciek',      'value': 198},
    {'username': 'niemagiczny_krzysiek', 'value': 100}]
}
const CreateRow = (row) => {
  const [pass, setPass] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('password');
  const [joinedSuccess, setJoinedSuccess] = React.useState(false);

  const data = row.row;

  const handleJoin = async () => {
    const values = {id: data.id, password: pass};
    console.log(values);
    const res = await handleJoinRoom(values);
    console.log(res);

    if (res === 200) {
      setJoinedSuccess(true);
    }
    else if (res === 401) {
      setPass('');
      setPlaceholder('wrong pass');
    }
  }

  return(
      <StyledRow>
        <P1> {data.id} </P1>
        <div className={'NameContainer'}>
          <P1> {data.name} </P1>
        </div>

        <input
            className={'PasswordInput'}
            type={`password${data.id}`}
            placeholder={placeholder}
            onChange={(e) => setPass(e.target.value)}
            value={pass}
        />
        <P1> {data.players} </P1>
        <div onClick={() => handleJoin()}
             className={data.players < data.max_players ? 'JoinButton' : 'JoinButtonClosed'}
        />
        {joinedSuccess && <Navigate to={'/table'} />}
      </StyledRow>
  )
}


export const ShowTables = ({ data=sampleData, gameName }) => {

  const [data2, setData] = React.useState(null);

  React.useEffect( () => {
    async function getData() {
      const data2 = await handleActiveMatches(gameName);
      console.log('TABLESDATA: ', data2);
      setData(data2);
    }
    getData();
  }, [])

  const createRows = () => {
    let aux = []
    // Object.values(data).forEach(val => val !== data.cols ? aux.push(<CreateRow row={val} />) : null);
    if (data2 !== null)
      data2.forEach(val => aux.push(<CreateRow row={val} />));
    return aux;
  }



  return(
      <StyledList>
        <div className={'Header'}>
          <B1> nr </B1>
          <B1> name </B1>
          <B1> password </B1>
          <B1> players </B1>
        </div>
        {
          createRows()
        }
      </StyledList>
  )
}
