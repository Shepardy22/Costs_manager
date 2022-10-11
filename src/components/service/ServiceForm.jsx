import styles from '../projects/ProjectForm.module.css';
import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServiceForm ({handleSubmit, textBtn, projectData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return (

            <form onSubmit={submit} className={styles.form}>
                <Input
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='insira o nome do serviço'
                handleChange={handleChange}
                />
                <Input
                type='number'
                text='Custo de Serviço'
                name='cost'
                placeholder='insira o valor total do serviço'
                handleChange={handleChange}
                /> 
                <Input
                type='text'
                text='Descriçao do serviço'
                name='descricao'
                placeholder='Descreva o serviço'
                handleChange={handleChange}
                />   
                <SubmitButton text={textBtn} />
            </form>
        
    )
    }
export default ServiceForm