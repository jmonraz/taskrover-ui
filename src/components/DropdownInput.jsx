import React, {useEffect, useState} from 'react';
import styles from './DropdownInput.module.css';

const DropdownInput = ({ options, onSelect, defaultOption }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        // Call the callback function passed from the parent component
        onSelect(selectedValue);
    };

    return (
        <>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value={defaultOption}>{defaultOption}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.firstName} {option.lastName}
                    </option>
                ))}
            </select>
        </>
    );
};

export default DropdownInput;
