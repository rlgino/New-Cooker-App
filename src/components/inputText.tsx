import React, { FC, ChangeEvent } from 'react';

interface InputTextProps {
    type: string;
    value?: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
}

const InputText: FC<InputTextProps> = ({ value, type, onChange, placeholder, name }) => {
    return (<div className="relative z-0 w-full mb-5 group">
        <input
            className="block p-4 w-full text-sm text-gray-900 bg-transparent border-2 rounded-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            type={type}
            value={value}
            onChange={e => onChange ? onChange(e) : null}
            placeholder={placeholder}
            name={name}
        />
    </div>
    );
};

export default InputText;