import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Projeto (){

    const {id} = useParams()

    const [project, setProject] = useState([])

    useEffect(() => {
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
    }, [id])


    return(

        <p>{project.name}</p>
    )
}

export default Projeto