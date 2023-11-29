import React, { InputHTMLAttributes } from "react"
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<any>,
    errorMessage?: string,
    classNameInput?: string,
    classNameError?: string,
    rules?: RegisterOptions
}

const Input = ({ type,
    className,
    errorMessage, placeholder,
    classNameInput = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rouded-sm focus:shadow-sm",
    classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
    name,
    register,
    rules,
}: Props) => {
    const registerResult = register && name ? register(name, rules) : {}
    return (
        <div className={className}>
            <input type={type}
                className={classNameInput}
                placeholder={placeholder}
                {...registerResult}
            />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    )
};

export default Input;
