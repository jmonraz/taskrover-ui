import {useState} from "react";

// styles
import styles from "./Input.module.css";

const Input = ({value, onChange, placeholder, styleName, type='text'}) => {
    const inputStyle = styles[styleName] || styles['default-input'];
    return (
        <>
            <input className={inputStyle} value={value} onChange={onChange} placeholder={placeholder} type={type} />
        </>
    );
};

export default Input;