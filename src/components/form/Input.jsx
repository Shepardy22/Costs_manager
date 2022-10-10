import Styles from './Input.module.css'

function Input({ type, text, name, placeholder, handleChange, value }) {
    return (
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                onChange={handleChange}
                value={value} />
        </div>
    )
}

export default Input