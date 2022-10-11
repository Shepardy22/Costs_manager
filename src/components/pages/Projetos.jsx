import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../projects/ProjectCard";

import Styles from './Projetos.module.css'

function Projects() {

    const [projects, setProjects] = useState([]);

    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projetos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setProjects(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className={Styles.project_container}>
            <div className={Styles.tile_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/Novoprojeto' text='Criar Projeto' />
            </div>

            {message && <Message type="success" msg={message} />}
                
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.nome}
                            key={project.id} 
                            />
                        ))}

            </Container>

        </div>
    )
}

export default Projects;