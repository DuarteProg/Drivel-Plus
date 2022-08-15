import styled from "styled-components"

import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function TelaHome(){
    
    const navigate = useNavigate();
    const localToken = JSON.parse(localStorage.getItem("token"))
    const localNome = JSON.parse(localStorage.getItem("nome"))
    const localHome = JSON.parse(localStorage.getItem("itemHome"))
    const localCartao = JSON.parse(localStorage.getItem("creditCard"))
    
    

    function TrocarPlano(){ 
        const config = {
            headers: {
              "Authorization": `Bearer ${localToken}`
            }
          }

      const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;
      const promise = axios.post(URL ,
        localCartao
    , config)
      promise.then((response) => {
       
       navigate("/subscriptions");
      });
    }

    function CancelarPlano(){
        const config = {
            headers: {
              "Authorization": `Bearer ${localToken}`
            }
          }

            const promise = axios.delete(
              `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`,
              config
            );
          
          
          promise.then((response) => {
            
            navigate("/subscriptions");

          });
         
    }

    JSON.parse(localStorage.getItem("dadositem"))

//função brinde
function Brinde(props){
const {title, link} = props
return (
    
    <Container2>
        <a href={link}>{title}</a>
        </Container2>
        
)
}

// função planHome
function PlanHome(props){
const {image} = props.localHome
return(
    <Container1>
      
        <Header1>
<img src={image} alt="imagem"/>
<ion-icon name="person-circle"></ion-icon>
</Header1>
<Nome1>Olá, {localNome}</Nome1>
<Main1>{
localHome.membership.perks.map((brindes, index) => {
const {title, link} = brindes;
return <Brinde title={title} key={index} link={link}/>
})
}</Main1>
<Footer1><h1 onClick={TrocarPlano}>Mudar Plano</h1>
<h2 onClick={CancelarPlano}>Cancelar Plano</h2>
</Footer1>
    </Container1>
)
}

    return (
        <Container>
            {(localHome.membership.length === 0)?"":
            <PlanHome localHome={localHome.membership}/>}
        </Container>
    )
}

const Container = styled.div`
width: 375px;
height: 667px;
color: #FFFFFF;
background: #0E0E13;
position: relative;
`
const Container1 = styled.div`
width: 375px;
height: 667px;
color: #FFFFFF;
background: #0E0E13;
`
const Container2 =styled.div`
width: 299px;
height: 52px;
background: #FF4791;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 8px;
margin-left: 38px;
a{
    color: #FFFFFF;
}
`;
const Header1 = styled.div`
display: flex;
img{
    width: 74px;
    height: 50px;
    margin-top: 32px;
    margin-left: 38px;
}
ion-icon{
    font-size: 32px;
    margin-left: 211px;
    margin-top: 22px;
}
`
const Main1 = styled.div`
`

const Nome1 = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
margin-left: 130px;
margin-top: 12px;
margin-bottom: 51px;
`
const Footer1 = styled.div`
position: absolute;
bottom: 0;
margin-bottom: 12px;
margin-left: 36px;
h1{
    display: flex;
    align-items: center;
    justify-content: center;
width: 299px;
height: 52px;

background: #FF4791;
border-radius: 8px;
margin-bottom: 8px;
}
h2{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 299px;
height: 52px;

background: #FF4747;
border-radius: 8px;
}
`