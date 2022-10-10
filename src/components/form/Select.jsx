import Styles from './Input.module.css'

function Select({ text, name, options, handleChange, value }) {
    return (
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleChange} value={value || ''}>
                <option>Selecione a categoria</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>)
                )}
            </select>
        </div>
    )
}

export default Select