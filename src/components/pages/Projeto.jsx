import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../projects/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import { v4 as uuidv4} from 'uuid'
import ServiceCard from '../service/ServiceCard';


function Projeto() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')

    //Quando o componente for montado, faça uma requisição para a API
    //Atualiza o estado com os dados recebidos (setProject),(setServices)
    useEffect(() => {
        //para ver o loading
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
                    setServices(data.services)
                })
                .catch(error => console.log(error))
        }, 200)
    }, [id ])

    //Edita o projeto e faz um PATH na API
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

    //Cria um novo serviço e atualiza o estado
    function createService(project){
        setMessage('')
        //////////////////////////////Regra de negocio///////////////////////////////
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

        //validação
        if (newCost > parseFloat(project.budget)) {
            setMessage('Valor do serviço ultrapassa o orçamento do projeto!')
            setType('error')
            project.services.pop()
            return false
        }
        //////////////////////////////Regra de negocio///////////////////////////////

        //Adição do serviço
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
                setServices(data.services)
                setShowServiceForm(!showServiceForm)
                setMessage('Serviço adicionado com sucesso!')
                setType('success')
            })
    }

    //Deleta um serviço e atualiza o estado
    function removeService(id, cost){
        const serviceUpdate = project.services.filter((service) => service.id !== id)
        
        const projetoUpdated = project

        projetoUpdated.services = serviceUpdate
        projetoUpdated.costs = parseFloat(projetoUpdated.costs) - parseFloat(cost)

        fetch(`http://localhost:5000/projetos/${projetoUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projetoUpdated)
        })
            .then((response) => response.json())
            .then((data) => {
               setProject(projetoUpdated)
                setServices(serviceUpdate)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            })
    }

    //Toggles para exibição dos forms
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
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    descricao={service.descricao}
                                    key={service.id}
                                    handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>

                    </Container>
                </div>
            )
                : (<Loading />)}

        </>

    )
}

export default Projeto