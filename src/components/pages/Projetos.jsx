import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import  Container  from "../layout/Container";
import LinkButton from "../layout/LinkButton";

import Styles from './Projetos.module.css'

function Projects (){

    const location = useLocation()
    let message =''

    if(location.state){
        message = location.state.message
    }
    return (
        <div className={Styles.project_container}>
            <div className={Styles.tile_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/Novoprojeto' text='Criar Projeto' />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass ="start">
                <p>Projetos...</p>
            </Container>
            
        </div>
    )
    }
    
    export default Projects;