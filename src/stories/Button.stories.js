import React from 'react';
import Button from "../components/Button";

export default {
    title: 'Button', // The title of your component category
    component: Button, // The component you want to showcase
};

// Your individual stories using the new syntax
export const Default = () => <Button>Sign In</Button>;
export const Alternative = () => <Button styleName='alt-button'>Alternative</Button>;
export const Confirm = () => <Button styleName='confirm-button'>Confirm</Button>;
export const Cancel = () => <Button styleName='cancel-button'>Cancel</Button>;

export const Close = () => <Button styleName='close-button'>Close Ticket</Button>;