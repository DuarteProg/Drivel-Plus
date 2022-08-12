import { useNavigate, Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import styled from "styled-components"



export default function SignUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [cpf, setCpf] = useState();
    const [password, setPassword] = useState();



    function confirmarInscricao(event) {
        event.preventDefault();
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up`;
        const promise = axios.post(URL, {
            email,
            name,
            cpf,
            password
        });
        promise.then((response) => {
const {data} = response
console.log(data)
            navigate("/")
        })
    }

    return (<>
        <Container>
        
            <Formulario>
                <form onSubmit={confirmarInscricao}>
                    <input type="email" value={email} placeholder="email" required
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br />
                    <input type="password" value={password} placeholder="password" required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="text" value={name} placeholder="name" required
                        onChange={(e) => setName(e.target.value)}
                    /> <br />
                    <input type="cpf" value={cpf} alt="cpf" placeholder="CPF" required
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <Botao>
                        <button>Sign Up</button>
                    </Botao>
                </form>
            </Formulario>
            <Link to={`/`}>
                <Frase>
                    <p>Already have an account? Click here!</p>
                </Frase>
            </Link>
        </Container>
    </>
    )



}

const Botao = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 6px;
margin-left: 20px;



button{
    width: 303px;
height: 45px;

background: #FF4791;
border-radius: 4.63636px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
text-align: center;
border: none;
color: #FFFFFF;
}
`
const Formulario = styled.div`
display: flex;
justify-content: center;
align-items: center;
input{
    width: 303px;
height: 45px;
margin-bottom: 16px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
margin-left: 36px;
padding-left: 11px;
}
`
const Container = styled.div`
width: 375px;
height: 667px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: #0E0E13;
`

const Frase = styled.div`
margin-top: 11px;

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-decoration-line: underline;

color: #FFFFFF;
`