import React from "react";
import styled from "styled-components";
import {Input} from "./common/Input";
import { Navigate } from "react-router-dom";
import { Form, Formik} from "formik";
import {P1, H2} from "./general/Fonts";
import * as Yup from "yup";
import { handleLogin, handleRegister } from "../handlers/authHandlers";
import {handleCreateRoom} from "../handlers/roomHandlers";


const StyledFormWrapper = styled.div`
  width: 100%;
  .Form {
    width: 100%;
    border: 2px solid black;
    border-radius: 20px;
    padding: 20px;

    display: flex;
    flex-direction: column;
  }
  
  .Submit {
    align-self: flex-start;
    justify-self: flex-end;
    margin-top: 20px;
    
    border: 2px solid gray;
    border-radius: 10px;
    background-color: transparent;
    width: 100px;
    height: 30px;
    
    cursor: pointer;
    transition: 0.5s;
  }
  
  .Submit:hover {
    border: 2px solid black;
  }
  
  .submitLabel {
    margin-top: 0;
  }
  
`


export const LoginForm = () => {
  const [loginSuccess, setLoginSuccess] = React.useState(false);

    return(
        <StyledFormWrapper>
            <Formik
                initialValues={{ username: "", password: ""}}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    const res = await handleLogin(values);
                    if (res === 200) {
                      setLoginSuccess(true);
                      setTimeout(() => window.location.reload(false), 500);
                    }
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required("Required"),
                    password: Yup.string()
                        .required("Required")
                })}
                >
            <Form className={'Form'}>
                <Input label={'Username'} placeholder={'Cool_cards_player_16'} type={'text'} name={'username'}/>
                <Input label={'Password'} placeholder={'test2'} type={'password'} name={'password'}/>
                <button className={'Submit'} type="submit">
                    <P1 className={'submitLabel'}> Login! </P1>
                </button>
            </Form>
            </Formik>
          {loginSuccess && <Navigate to={'/'} />}
        </StyledFormWrapper>
    )
}

export const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);

    return(
        <>
          {!isRegistered ?(
            <StyledFormWrapper>
                <Formik
                    initialValues={{ username: "", email: "", password: "", repeatPassword: ""}}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        const res = await handleRegister(values);
                        if (res === 200) {
                          setIsRegistered(true);
                        }
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .min(3, "Min 3 characters long")
                            .max(20, "Max 20 characters long")
                            .matches(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers and _")
                            .required("Required"),
                        email: Yup.string()
                            .email("Not a valid email")
                            .required("Required"),
                        password: Yup.string()
                            .required("Required"),
                        repeatPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], "Passwords are not the same")
                            .required("Required")
                    })}
                >
                    <Form className={'Form'}>
                        <Input label={'Username'} placeholder={'Cool_cards_player_16'} type={'text'} name={'username'}/>
                        <Input label={'E-mail'} placeholder={'card_dude@hedgehog.pl'} type={'text'} name={'email'}/>
                        <Input label={'Password'} placeholder={'test2'} type={'password'} name={'password'}/>
                        <Input label={'Repeat password'} placeholder={'test2'} type={'password'} name={'repeatPassword'}/>
                        <button className={'Submit'} type="submit">
                            <P1 className={'submitLabel'}> Register! </P1>
                        </button>
                    </Form>
                </Formik>
            </StyledFormWrapper>)
              :
              (
                  <H2>
                    Successfully registered! You can sign in now.
                  </H2>

              )}
        </>
    )
}


export const CreateGameForm = ( {name, maxPlayers, minPlayers} ) => {

  const [creationSuccess, setCreationSuccess] = React.useState(false);

  return(
      <StyledFormWrapper>
        <Formik
            initialValues={{ table_name: "", password: "", game_name: name, max_players: maxPlayers}}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              const res = await handleCreateRoom(values);
              if (res === 200) {
                setCreationSuccess(true);
              }
            }}
            validationSchema={Yup.object({
              table_name: Yup.string()
                  .required("Required"),
              password: Yup.string(),
              max_players: Yup.number()
                  .max(maxPlayers)
                  .min(minPlayers)

            })}
        >
          <Form className={'Form'}>
            <Input label={'Table name'} placeholder={'your table name'} type={'text'} name={'table_name'}/>
            <Input label={'Password'} placeholder={'leave empty to skip'} type={'text'} name={'password'}/>
            <Input label={'Max players'}  type={'number'} name={'max_players'}/>
            <button className={'Submit'} type="submit">
              <P1 className={'submitLabel'}> Create! </P1>
            </button>
          </Form>
        </Formik>
        {creationSuccess && <Navigate to='/table' />}
      </StyledFormWrapper>
  )
}

