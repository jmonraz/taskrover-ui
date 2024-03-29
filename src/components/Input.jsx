// styles
import styles from "./Input.module.css";



const Input = ({placeholder, styleName, type='text', inputProps, required=false, disabled=false}) => {

    const inputStyle = styles[styleName] || styles['default-input'];

    return (
        <>

            <input onChange={inputProps.onChange} value={inputProps.value} className={inputStyle} placeholder={placeholder} type={type} required={required} disabled={disabled}/>

        </>
    );
};

export default Input;