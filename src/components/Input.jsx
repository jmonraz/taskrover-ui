import {useState} from "react";

// styles
import styles from "./Input.module.css";

// hooks
import {useFormInput} from "../hooks/useFormInput";

const Input = ({value, onChange, placeholder, styleName, type='text'}) => {

    const inputProps = useFormInput('');
    const inputStyle = styles[styleName] || styles['default-input'];

    return (
        <>
            <input {...inputProps} className={inputStyle} value={value} onChange={onChange} placeholder={placeholder} type={type} />
        </>
    );
};

export default Input;