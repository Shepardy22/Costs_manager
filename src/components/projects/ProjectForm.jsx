import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import Styles from './ProjectForm.module.css'

import { useEffect, useState } from 'react'

function ProjectForm({ btnText }) {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error:', error))
    },
        [])



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
            <Select name="categoriaID" text="Criar projeto" options={categorias} />

            <SubmitButton text={btnText} />
        </form>

    )
}

export default ProjectForm