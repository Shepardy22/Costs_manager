import ProjectForm from '../projects/ProjectForm'
import Styles from './Novoprojeto.module.css'



function Novoprojeto () {
    return (
      <div className={Styles.newproject_container}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm btnText="Criar Projeto"/>

      </div>
    )
  }
  
  export default Novoprojeto