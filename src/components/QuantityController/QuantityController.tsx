import React from "react"
import InputNumber, { InputNumberProps } from "../InputNumber/InputNumber";
import _, { rest } from "lodash";

interface Props extends InputNumberProps {
    max?: number,

    onIncrease?: (value: number) => void
    onDecrease?: (value: number) => void
    onType?: (value: number) => void
    classNameWrapper?: string
}

const QUantityController = ({
    max, onIncrease, onDecrease, onType, classNameWrapper = "ml-10", classNameError = "hidden", classNameInput = "h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none", value, ...rest
}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _value = Number(event.target.value)
        if (max !== undefined && _value > max) {
            _value = max
        } else if (_value < 1) {
            _value = 1
        }
        onType && onType(_value);

    }
    const handleIncrease = () => {
        let _value = Number(value) + 1;
        if (max !== undefined && _value > max) {
            _value = max;
        }
        onIncrease && onIncrease(_value);
    }
    const handleDecrease = () => {
        let _value = Number(value) - 1;
        if (_value < 1) {
            _value = 1;
        }
        onDecrease && onDecrease(_value);
    }
    return (
        <div className={"flex  items-center" + classNameWrapper}>
            <button
                onClick={handleDecrease}
                className="border h-8 w-8 flex items-center justify-center text-gray-600 rounded-sm border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
            </button>
            <InputNumber onChange={handleChange} value={value} className="" classNameError={classNameError} {...rest} classNameInput={classNameInput} />
            <button
                onClick={handleIncrease}
                className="border h-8 w-8 flex items-center justify-center text-gray-600 rounded-sm border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
};

export default QUantityController;
