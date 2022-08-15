import { useState, useEffect } from "react";
// import TokenContext from "../Contexts/AuthContext";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";




export default function TelaPlanos() {
  // const { token } = useContext(TokenContext);
const [planos, setPlanos] = useState()
const localToken = JSON.parse(localStorage.getItem("token"))


useEffect(() => {

  const config = {
    headers: {
      "Authorization": `Bearer ${localToken}`
    }
  }

  const promise = axios.get(
    `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships`, config);


promise.then((response) => {
  const { data } = response;
  setPlanos(data)
});
}, []);

// tela de planos!
function Plans(props){
  const {id, image, price} = props
return (
  <Link to={`/subscriptions/${id}`}>
  <Container1>
  <img src={image} alt="logo"/>
  <p>R$ {price}</p>
  </Container1>
  </Link>
)
}


  return (
    <Container>
        <Logo>
      <p>Choose your plan</p>
      </Logo>
      <Plano>
{planos?.map((plans) => {
const {id, image, price} = plans;
return <Plans key={id} id={id} image={image} price={price}
/>
})}
      </Plano>
    </Container>
  );
}

const Container = styled.div`
  width: 375px;
  height: 667px;

  background: #0e0e13;
  p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
margin-left: 69px;
padding-top: 20px;
padding-bottom: 20px;
color: #FFFFFF;
  }
`;
const Plano = styled.div`
margin-left: 45px;

`;

const Container1 = styled.div`
display: flex;
align-items: center;
width: 290px;
height: 180px;
background: #0E0E13;
border: 3px solid #7E7E7E;
border-radius: 12px;
margin-bottom: 10px;
img{
 width: 130px;
height: 95px;

margin-left: 10px; 
}
p{

width: auto;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;

color: #FFFFFF;
}
`
const Logo = styled.div`
`