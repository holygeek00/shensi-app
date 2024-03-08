// 创建一个select选项框, 模仿shadcn/ui
import React from 'react';

const Select = ({label, options, onChange, defaultValue}) => {

    return (
        <div>
            <label htmlFor={label}
                   className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select id={label}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={defaultValue}
                    onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}