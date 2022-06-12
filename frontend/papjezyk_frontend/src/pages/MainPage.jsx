import React from "react";
import styled from "styled-components";
import {H1, B1, H2} from "../components/general/Fonts";
import { PageWrapper } from "../components/general/PageWrapper";


const StyledMainPage = styled.ul`
  list-style-type: disc;

  .ListItem{
    font-size: 50px;
  }

  .Content{
    display: flex;
    width: 80%;
    padding-left: 40px;
    padding-right: 40px;
    text-align: left;
    ${'' /* border-radius: 25px; */}
    ${'' /* border: 2px solid black; */}
    margin: 5px;
  }

`


const MainPage = () => {
    // const [testApi, setTestApi] = React.useState('not tested');

    // React.useEffect( () => {
    //         fetch('/hello')
    //             .then(res => res.text())
    //             .then(res => {
    //                 console.log(res);
    //                 setTestApi(res);
    //                 console.log("test api state hook: ", testApi);
    //             })
    //     }, [])

    return(
        <PageWrapper>
            <H1> Witaj w Jeżyku! </H1>
            <StyledMainPage>
                    <div className={'Content'}>
                        <H2>Jeżyk jest innowacyjnym serwisem internetowym pozwalającym na rozgrywkę w gry
                        karciane wielu graczom jednocześnie.</H2>
                    </div>
                    <div className={'Content'}>
                        <H2>Na stronie możliwe jest stworzenie pokoju z
                        grą lub dołączenia do istniejącego.</H2>
                    </div>
                    <div className={'Content'}>
                        <H2>Dodatkową możliwością jest założenie konta,
                        dzięki czemu można zbierać osiągnięcia, zdobywać poziomy i rywalizować z innymi
                        graczami w rankingu.</H2>
                    </div>

                {/* <li className={'ListItem'}>
                    <div className={'Content'}>
                    </div>
                </li> */}
            </StyledMainPage>
        </PageWrapper>
    )
}

export default MainPage
