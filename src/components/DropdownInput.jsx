import React, {useState} from 'react';

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
                {options.map((option) => {
                    if(option.fullName !== defaultOption){
                        return <option key={option} value={option}>{option}</option>
                    }
                }
                )}
            </select>
        </>
    );
};

export default DropdownInput;
