import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import TokenContext from "../Contexts/AuthContext";

// import beneficios from "../Assets/img/beneficios.png"
// import grana from "../Assets/img/grana.png"


export default function TelaPlano(){
  const { token } = useContext(TokenContext);
  const { planoID } = useParams();
    const [nomeCartao, setnomeCartao] = useState();
    const [digitoCartao, setdigitoCartao] = useState();
    const [codigo, setCodigo] = useState();
    const [validade, setValidade] = useState();
    const [plano, setPlano] = useState("");

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
const {title, id} = props
return (
  <>{title}</>
)
}


// função para o plano
function Plan(props){
  const {name, image, price, perks} = props.plano;

return(
  <Container1>
<img src={image} alt="imagem"/>

{plano.perks.map((perk) => {
 const {title, id} = perk;
  return <Perk title={title} id={id} key={id}/>
})}
  </Container1>
)
}

// função para o input
    function confirmarPlano(event) {
        event.preventDefault();
      }

    
    return (
        <Container>
            <Setinha>
            <ion-icon name="arrow-back-outline"></ion-icon>
            </Setinha>
            <Main>

  
{(plano.length === 0)?"":
 <Plan plano={plano} outroPlano={plano.perks}
/>}

  

            </Main>
            <Input>
            
        <form onSubmit={confirmarPlano}>
          <input
            type="text"
            value={nomeCartao}
            placeholder="Nome impresso no cartão"
            required
            onChange={(e) => setnomeCartao(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            value={digitoCartao}
            placeholder="Digitos do catão"
            required
            onChange={(e) => setdigitoCartao(e.target.value)}
          />
           <input
            type="text"
            value={codigo}
            placeholder="Codigo de segurança"
            required
            onChange={(e) => setCodigo(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            value={validade}
            placeholder="Validade"
            required
            onChange={(e) => setValidade(e.target.value)}
          />
          <Botao>
            <button type="submit">Login</button>
          </Botao>
        </form>
      
            </Input>
            <Botao></Botao>
        </Container>
    )
}

const Container = styled.div`
width: 375px;
height: 667px;
background: #0E0E13;
color: white;
`
const Setinha = styled.div`
color: #FFFFFF;
transform: matrix(1, 0, 0, -1, 0, 0);
` 
const Main = styled.div`
`
const Input = styled.div`
`
const Botao = styled.div`
`

const Container1 = styled.div`
color: white`