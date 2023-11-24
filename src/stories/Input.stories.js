import React from "react";
import Input from "../components/Input";

export default {
    title: 'Input',
    component: Input
};

export const Default = () => <Input type="text" placeholder="Username" />;
export const Password = () => <Input type="password" placeholder="Password" />;