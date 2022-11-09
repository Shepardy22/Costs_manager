import styles from './Home.module.css'
import bg1 from '../../img/bg1.jpg'
import LinkButton from '../layout/LinkButton'

function Home () {
  return (
    <section className={`${styles.home_container}`}>
      <h1>Bem-Vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <div className={`${styles.btnAlign}`}>
        <LinkButton to='/Novoprojeto' text='Criar Projeto' />
      </div>
      {/* <img src={bg1} alt="Costs" /> */}
    </section>
  )
}
  
  export default Home