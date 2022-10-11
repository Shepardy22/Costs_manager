import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../projects/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import {parse, v4 as uuidv4} from 'uuid'


function Projeto() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')

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

    function editPost(project) {
        setMessage('')
        //budget validation
        if (project.budget < project.costs) {
            setMessage('O orçamento não pode ser menor que o custo total do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projetos/${id}`, {
            //alterar somente o que foi alterado
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(!showProjectForm)
                setMessage('Projeto editado com sucesso!')
                setType('success')
            })
    }

    function createService(project){
        setMessage('')
        //Regra de negocio
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

        //validação
        if (newCost > project.budget) {
            setMessage('Valor do serviço ultrapassa o orçamento do projeto!')
            setType('error')
            project.services.pop()
            return false
        }

        //adição do serviço
        project.costs = newCost
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then((data) => {
                setProject(data)
                setShowServiceForm(!showServiceForm)
                setMessage('Serviço adicionado com sucesso!')
                setType('success')
            })
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.projeto_detalhes}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.detalhes_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Salvar'}
                            </button>
                            {!showProjectForm ? (

                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.nome}

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
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText='Concluir edição'
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Salvar'}
                            </button>

                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                    handleSubmit={createService}
                                    textBtn='Adicionar serviço'
                                    projectData={project}
                                    />
                                )}
                            </div>
                        </div>

                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            <p>Itens de Serviço</p>
                        </Container>
                    </Container>
                </div>
            )
                : (<Loading />)}

        </>

    )
}

export default Projeto