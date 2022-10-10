import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import Styles from './ProjectForm.module.css'

function ProjectForm({btnText}) {
    return (
        <form className={Styles.form}>
            <div>
                <Input
                    type="text"
                    placeholder="Insira o nome do projeto"
                    name="name"
                    text="Nome do projeto" />
            </div>
            <div>
                <Input
                    type="number"
                    placeholder="Insira o orçamento do projeto"
                    name="valorTotal"
                    text="Orçamento Total" />
            </div>
            <Select
                name="categoriaID"
                text="Criar projeto"
            />
            <SubmitButton text={btnText} />
        </form>

    )
}

export default ProjectForm