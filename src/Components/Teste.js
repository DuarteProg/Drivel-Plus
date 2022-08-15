import styled from "styled-components"
import { useContext } from "react";
import TokenContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Teste(){
    const localHome = JSON.parse(localStorage.getItem("itemHome"))

console.log(localHome.membership)


function PlansHome(props){
    const {name, image} = props.localHome
return(
    <Container1>{image}{name}</Container1>
)
}

    return(
        <Container>
 {(localHome.membership.length === 0)?"":
            <PlansHome localHome={localHome.membership}/>}
        </Container>
    )
}

const Container = styled.div`

`
const Container1 = styled.div`
`