import {useState} from "react";

// styles
import styles from "./Input.module.css";

// hooks
import {useFormInput} from "../hooks/useFormInput";

const Input = ({placeholder, styleName, type='text'}) => {

    const inputProps = useFormInput('');
    const inputStyle = styles[styleName] || styles['default-input'];

    return (
        <>
            <input onChange={inputProps.onChange} value={inputProps.value} className={inputStyle} placeholder={placeholder} type={type} />
        </>
    );
};

export default Input;