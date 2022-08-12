import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import TokenContext from "../Contexts/AuthContext";
import axios from "axios";
import styled from "styled-components";


export default function LoginPage() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  function confirmarLogin(event) {
    event.preventDefault();
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/login`;
    const promise = axios.post(URL, {
      email,
      password,
    });
    promise.then((response) => {
     const {data} = response;
      setToken(data.token)
      navigate("/subscriptions");
    });
  }

  return (
    <Container>
      <Logo>
        <h1>Driven</h1>
        <h2>+</h2>
      </Logo>
      <Formulario>
        <form onSubmit={confirmarLogin}>
          <input
            type="email"
            value={email}
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <input
            type="password"
            value={password}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Botao>
            <button type="submit">Login</button>
          </Botao>
        </form>
      </Formulario>
      <Link to={`/sign-up`}>
        <Frase>
          <p>Don't have an account? Click here!</p>
        </Frase>
      </Link>
    </Container>
  );
}

const Botao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  margin-left: 20px;

  button {
    width: 303px;
    height: 45px;

    background: #FF4791;
    border-radius: 4.63636px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    border: none;
    color: #ffffff;
  }
`;
const Formulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    margin-left: 20px;
    padding-left: 11px;
    margin-bottom: 16px;
  }
`;
const Container = styled.div`
  width: 375px;
  height: 667px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #0E0E13;
`;

const Frase = styled.div`
  margin-top: 11px;
  width: 150px;
  height: 17px;
  left: 85px;
  top: 553px;

  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;

  color: #FFFFFF;
`;

const Logo = styled.div`
display: flex;
  color: #FFFFFF;
  font-size: 50px;
  h2{
    padding-top: 0.5px;
    padding-left: 10px;
    color: #FF4791;
    font-size: 60px;
  }


`