import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';


function Projeto() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setProject(data)
                })
                .catch(error => console.log(error))
        }, 200)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.projeto_detalhes}>
                    <Container customClass='column'>
                        <div className={styles.detalhes_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Salvar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento: </span>R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span>R$ {project.costs}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>Formulario para Ediçao</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            )
                : (<Loading />)}

        </>

    )
}

export default Projeto