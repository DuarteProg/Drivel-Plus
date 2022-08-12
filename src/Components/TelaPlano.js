import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import TokenContext from "../Contexts/AuthContext";

import beneficios from "../Assets/img/beneficios.png"
// import grana from "../Assets/img/grana.png"


export default function TelaPlano(){
  const { token } = useContext(TokenContext);
  const { planoID } = useParams();
  const navigate = useNavigate();
   const [membershipId, setMembershipId] = useState();
    const [cardName, setCardName] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [securityNumber, setSecurityNumber] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [plano, setPlano] = useState("");
    const [click, setClick] = useState(false)
 
  
    
    //Parte do post
    function FinalizarPlano(e){ 
      e.preventDefault();
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;
    const promise = axios.post(URL , {
      membershipId,
      cardName,
      cardNumber,
      securityNumber,
      expirationDate,
    }, {
      headers: {
          "Authorization": `Bearer ${token}`
        }
  })
    promise.then((response) => {
     const {data} = response;
     console.log(data);
     navigate("/home");
    });
  }

    //effet do get
    useEffect(() => {
      const promise = axios.get(
        `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planoID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
    
    promise.then((response) => {
      const { data } = response;
      console.log(data)
      setPlano(data)
      
    });
  }, [])
  

// função perk
function Perk(props){
const {title, index, membershipId} = props
setMembershipId(membershipId)
return (
  <Container2>
  <h2>{index + 1}.</h2>
   <h3>{title}</h3>
  </Container2>
)
}


// função para o plano
function Plan(props){
  const {name, image, price} = props.plano;

return(
  <Container1>
    <Logo1>
<img src={image} alt="imagem"/>

<p>{name}</p>
</Logo1>
<Main1>
<Display>
<img src={beneficios}/> <p>Benefícios:</p>
</Display>
{plano.perks.map((perk, index) => {
 const {title, id, membershipId} = perk;
  return <Perk membershipId={membershipId} title={title} id={id} key={id} index={index}/>
})}
<p>{price}</p>
</Main1>
  </Container1>
)
}


    // função principal
    return (<>
        <Container>
            <Setinha>
            <ion-icon name="arrow-back-outline"></ion-icon>
            </Setinha>
            <Main>

  
{(plano.length === 0)?"":
 <Plan plano={plano}
/>}

  

            </Main>
            <Input>
            
        
          <input
            type="text"
            value={cardName}
            placeholder="Nome impresso no cartão"
            onChange={(e) => setCardName(e.target.value)}
            required
          />{" "}
          <br />
          <input
            type="text"
            value={cardNumber}
            placeholder="Digitos do catão"
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
           <input
            type="text"
            value={securityNumber}
            placeholder="Codigo de segurança"
            onChange={(e) => setSecurityNumber(e.target.value)}
            required
          />{" "}
          <br />
          <input
            type="text"
            value={expirationDate}
            placeholder="Validade"
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
          <Botao>
            <button onClick={() => setClick(true)} >Login</button>
          </Botao>
       
      
            </Input>
            <Botao></Botao>
        </Container>
            {click ? <Modal> 
            <Modal1>
            <ion-icon onClick={(() =>setClick(false))} name="close-outline"></ion-icon>
            <p>opa</p>
            <Botoes>
            <button onClick={(() =>setClick(false))}>nao</button>
            <button onClick={FinalizarPlano}>sim</button>
            </Botoes>
            </Modal1>
            </Modal>:""}
        </>
    )
}


const Botoes = styled.div`
button{
  width: 95px;
height: 52px;
}
`
const Modal1 = styled.div`
width: 375px;
height: 667px;
background: rgba(0, 0, 0, 0.7);
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
ion-icon{

}
`
const Modal = styled.div`
z-index: 1;
position: absolute;
bottom: -210px;
right: 0;
span{
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.7);
}
ion-icon{
 
  font-size: 28px;
}
`

const Container = styled.div`
position: relative;
background: #0E0E13;
color: white;
`
const Setinha = styled.div`
color: #FFFFFF;
transform: matrix(1, 0, 0, -1, 0, 0);
ion-icon{
  margin-left: 22px;
  margin-bottom: 24px;
  font-size: 28px;
}
` 
const Logo1 = styled.div`
img{
  margin-top: 35px;
margin-left: 108px;
}
p{
  margin-top: 10px;
  margin-bottom: 22px;
margin-left: 108px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
}
`
const Container2 = styled.div`
display: flex;
h2{
  font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
margin-right: 2px;
}
h3{
  font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
}
`
const Main = styled.div`
`
const Main1 = styled.div`
margin-left: 44px;
`
const Input = styled.div`
margin-left: 40px;
input{
  width: 299px;
height: 52px;
border-radius: 8px;
margin-bottom: 8px;
padding-left: 14px;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #7E7E7E;
}
`
const Botao = styled.div`
`
const Display = styled.div`
display: flex;
align-items: center;
img{
  margin-right: 3px;
}
p{
  font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
}
`
const Container1 = styled.div`

color: white

`



