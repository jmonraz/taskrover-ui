// styles
import styles from "./Input.module.css";


const Input = ({placeholder, styleName, type='text', inputProps}) => {
    const {value, onChange, clearValue} = inputProps;

    const inputStyle = styles[styleName] || styles['default-input'];

    return (
        <>
            <input onChange={onChange} value={value} className={inputStyle} placeholder={placeholder} type={type} />
        </>
    );
};

export default Input;