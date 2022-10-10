function ProjectForm(){
    return (
        <form>
            <div>
                <input type="text" placeholder="Insira o nome do projeto" />
                </div>
            <div>
                <input type="text" placeholder="Insira o orçamento total" />
                </div>
            <div>
                <select name="categoria_id" >
                    <option disabled>Selecione a categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar projeto" />
            </div>
        </form>    
        
        )
}

export default ProjectForm