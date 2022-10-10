import ProjectForm from '../projects/ProjectForm'
import Styles from './Novoprojeto.module.css'

import { useNavigate } from 'react-router-dom'


function Novoprojeto() {

   const navigate = useNavigate()

  function createPost(project) {

    project.costs = 0
    project.services = []

    fetch('http://localhost:5000/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(project),

    }).then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data)
        navigate('/projetos', {state: {message: 'Projeto criado com sucesso!'}})
      })
      .catch(error => console.error('Error:', error))



  }

  return (
    <div className={Styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />

    </div>
  )
}

export default Novoprojeto