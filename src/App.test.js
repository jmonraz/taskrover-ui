import { render, screen, fireEvent } from '@testing-library/react';
import Input from "./components/Input";
import Button from "./components/Button";
import React from "react";

test('renders input element', () => {
    render(<Input type="text" placeholder="Username" />);
    const inputElement = screen.getByPlaceholderText(/Username/i);
    expect(inputElement).toBeInTheDocument();
})

test('value should change', () => {
    render(<Input type="text" placeholder="Username" />);
    const inputElement = screen.getByPlaceholderText(/Username/i);
    expect(inputElement.value).toBe('');
    inputElement.value = 'test';
    expect(inputElement.value).toBe('test');
})

test('handleChange updates input value correctly', () => {
    // render the Input component
    render(
        <Input type="text" placeholder="Test Placeholder" />
    );

    // find the input element by its placeholder text
    const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);

    // simulate a change event by entering text into the input
    fireEvent.change(inputElement, {target: {value: 'test'}});

    // verify that handleChange was called and input value is updated
    expect(inputElement.value).toBe('test');
})

// test that that button onClick is called
