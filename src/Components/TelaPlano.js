import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom"
import TokenContext from "../Contexts/AuthContext";

import beneficios from "../Assets/img/beneficios.png"
import grana from "../Assets/img/grana.png"


export default function TelaPlano(){
  const { setItem, item, setDadosHome } = useContext(TokenContext);
  const { planoID } = useParams();
  const navigate = useNavigate();
   const [membershipId, setMembershipId] = useState();
    const [cardName, setCardName] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [securityNumber, setSecurityNumber] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [plano, setPlano] = useState("");
    const [click, setClick] = useState(false)
    const localToken = JSON.parse(localStorage.getItem("token"))
  
    
    
  
    
    //Parte do post
    function FinalizarPlano(e){ 
      e.preventDefault();
      const creditCard = {
        membershipId,
        cardName,
        cardNumber,
        securityNumber,
        expirationDate
      }
      localStorage.setItem("dadositem", JSON.stringify(item))
      const config = {
        headers: {
          "Authorization": `Bearer ${localToken}`
        }
      }

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;
    const promise = axios.post(URL , creditCard, 
      config
      
  )
    promise.then((response) => {
      const {data} = response;
      setDadosHome(creditCard)
      setItem({data: data, creditCard: creditCard})
      localStorage.setItem("itemHome", JSON.stringify(data))
      localStorage.setItem("creditCard", JSON.stringify(creditCard))
     navigate("/home"); // mudar para home
    });
    promise.catch((err) => {
      alert("Falha ao fazer sua assinatura");
    });
  }
  localStorage.setItem("member", JSON.stringify(membershipId))
  localStorage.setItem("nome", JSON.stringify(cardName))
  
  
  

    //effet do get
    useEffect(() => {
      const config = {
        headers: {
          "Authorization": `Bearer ${localToken}`
        }
      }
      const promise = axios.get(
        `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planoID}`,
        config
      );
    
    
    promise.then((response) => {
      const { data } = response;
      
      setPlano(data)
      setItem({data: data})
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
<img src={beneficios} alt="beneficios"/> <p>Benefícios:</p>
</Display>
{plano.perks.map((perk, index) => {
 const {title, id, membershipId} = perk;
  return <Perk membershipId={membershipId} title={title} id={id} key={id} index={index}/>
})}
<Main3>
<img src={grana} alt="imagem"/> Preço:
<p>R$: {price} cobrados mensalmente</p>
</Main3>
</Main1>
  </Container1>
)
}


    // função principal
    return (<>
        <Container>
        <Link to={`/subscriptions`}>
            <Setinha>
            <ion-icon name="arrow-back-outline"></ion-icon>
            </Setinha>
            </Link>
            <Main>

  
{(plano.length === 0)?"":
 <Plan plano={plano}
/>}

  

            </Main>
            <Input>
            
            <DisplayInput1>
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
          </DisplayInput1>
          <DisplayInput>
            <DisplayInput2>
           <input
            type="text"
            value={securityNumber}
            placeholder="Codigo de segurança"
            onChange={(e) => setSecurityNumber(e.target.value)}
            required
          />{" "}
          <br /></DisplayInput2>
          <DisplayInput3>
          <input
            type="text"
            value={expirationDate}
            placeholder="Validade"
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
          </DisplayInput3>
          </DisplayInput>
          <Botao>
            <button onClick={() => setClick(true)} >ASSINAR</button>
          </Botao>
            </Input>
            <Botao></Botao>
        </Container>
            {click ? <Modal> 
            <ion-icon onClick={(() =>setClick(false))} name="close-outline"></ion-icon>
            <Modal1>
            <p>Tem certeza que deseja assinar o plano Driven Plus (R$ {item.data.price})?</p>
            <Botoes>
            <h5 onClick={(() =>setClick(false))}>nao</h5>
            <h6 onClick={FinalizarPlano}>sim</h6>
            </Botoes>
            </Modal1>
            </Modal>:""}
        </>
    )
}


const DisplayInput = styled.div`
display: flex;
gap: 9px;

`
const DisplayInput1 = styled.div`
input{
  width: 299px;
height: 52px;

}
`
const DisplayInput2 = styled.div`
input{
  width: 135px;
  height: 52px;

}
`
const DisplayInput3 = styled.div`
input{
  width: 134px;
  height: 52px;

}
`
const Botoes = styled.div`
display: flex;
h5{
  width: 95px;
height: 52px;
left: 86px;
top: 376px;
display: flex;
align-items: center;
justify-content: center;
background: #CECECE;
border-radius: 8px;
margin-top: 30px;
}
h6{
  width: 95px;
height: 52px;
display: flex;
align-items: center;
justify-content: center;
margin-left: 14px;

background: #FF4791;
border-radius: 8px;
margin-top: 30px;
}
`
const Modal = styled.div`
width: 375px;
height: 667px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
z-index: 1;

background: rgba(0, 0, 0, 0.7);
ion-icon{
 color: white;
 position: absolute;
 top: 0;
 right: 0;
margin-right: 30px;
margin-top: 35px;
width: 28px;
height: 24px;
color: #000;
background: #FFFFFF;
border-radius: 3px;
}
`
const Modal1 = styled.div`
width: 248px;
height: 210px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: #FFFFFF;
border-radius: 12px;
p{
  width: 204px;
  height: auto;
  font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 21px;

color: #000000;
}

`

const Container = styled.div`
position: absolute;
background: #0E0E13;
color: white;
width: 375px;
height: 667px;

`
const Setinha = styled.div`
color: #FFFFFF;
transform: matrix(1, 0, 0, -1, 0, 0);
ion-icon{
  margin-left: 15px;
  margin-bottom: 24px;
  font-size: 28px;
}
` 
const Logo1 = styled.div`
img{
  margin-top: 20px;
margin-left: 100px;
}
p{
  margin-top: 10px;
  margin-bottom: 22px;
margin-left: 100px;
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
margin-left: 33px;
img{
  
}
`
const Input = styled.div`
margin-left: 30px;
input{
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
margin-top: 12px;
button{
  width: 319px;
height: 52px;
background: #FF4791;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
}
`
const Main3 = styled.div`
margin-top: 12px;
margin-bottom: 25px;
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



