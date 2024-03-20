import React, {useState, useEffect} from 'react';

const DropdownInput = ({ options, onSelect, defaultOption }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        // Call the callback function passed from the parent component
        onSelect(selectedValue);
    };

    useEffect(() => {
        console.log("Options: ", options);
    }, [options]);

    return (
        <>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value={defaultOption}>{defaultOption}</option>
                {options.map((option) => {
                    if(option.fullName !== defaultOption){
                        return <option key={option.id} value={option.id}>{option.fullName}</option>
                    }
                }
                )}
            </select>
        </>
    );
};

export default DropdownInput;
