import {H1, H2} from "../components/general/Fonts";
import {PageWrapper} from "../components/general/PageWrapper";
import styled from "styled-components";
import {LoginForm, RegisterForm} from "../components/Forms";



const LogRegWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  
  height: 500px;
  
  .FormContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
    margin-inside: 2px;
  }
`

const LoginRegister = () => {

    return(
        <PageWrapper>

                <H1> Join millions of players on the best online gaming site now! </H1>
            <LogRegWrapper>
                <div className={'FormContainer'}>
                    <H2> Sign in! </H2>
                    <LoginForm />
                </div>
                <div className={'FormContainer'}>
                    <H2> Create an account now! </H2>
                    <RegisterForm />
                </div>
            </LogRegWrapper>
        </PageWrapper>
    )
}

export default LoginRegister