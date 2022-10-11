import styles from './ProjectCard.module.css';
import { Link } from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({id, name, budget, category, removeProject}) {

    const remove = (e) => {
        e.preventDefault()
        removeProject(id)
    }

    return (
        
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
               <span>Orçamento:  </span> R$ {budget}
            </p>
            <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
            <div className={styles.project_card_actions}>
                <Link to={`/Projeto/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard;