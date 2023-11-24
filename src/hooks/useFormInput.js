import {useState} from "react";

export function useFormInput(initialValue = '') {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
        console.log(e.target.value);
    }

    const clearValue = () => setValue('');

    return {value, onChange: handleChange, clearValue: clearValue}
}