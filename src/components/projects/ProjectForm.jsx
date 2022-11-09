import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import Styles from './ProjectForm.module.css'

import { useEffect, useState } from 'react'

function ProjectForm({ btnText, handleSubmit, projectData }) {

    const [category, setCategorias] = useState([])
    const [project, setProject] = useState(projectData || {})

    //pegar categorias
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/Shepardy22/Costs_manager/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setCategorias(data)
            })
            .catch(error => console.error('Error:', error))
    },
        [])

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
        // console.log(project)
    }

    
    function handleChange  (event)  {
        setProject({ ...project, [event.target.name]: event.target.value })
        //  console.log(project)
    }
    function handleCategoria  (event)  {
        setProject({...project, category: {
                id: event.target.value,
                nome: event.target.options[event.target.selectedIndex].text
            },
        })
        // console.log(project)
    }



    return (
        <form onSubmit={submit} className={Styles.form}>
            <div>
                <Input
                    type="text"
                    placeholder="Insira o nome do projeto"
                    name="name"
                    text="Nome do projeto"
                    handleChange={handleChange}
                    value={project.name ? project.name : ''} />
            </div>
            <div>
                <Input
                    type="number"
                    placeholder="Insira o orçamento do projeto"
                    name="budget"
                    text="Orçamento Total"
                    handleChange={handleChange}
                    value={project.budget ? project.budget : ''} />
            </div>
                <Select name="categoriaID"
                text="Criar projeto"
                options={category}
                handleChange={handleCategoria}
                value={project.category ? project.category.id : ''} />

            <SubmitButton text={btnText} />
        </form>

    )
}

export default ProjectForm