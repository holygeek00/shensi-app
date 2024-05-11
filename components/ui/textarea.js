// 生成一个textarea 文本框组件，使用函数式组件写法
import React, {useState} from 'react';

const Textarea = ({title, textareaContent}) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <div className="flex flex-col space-y-4">
                <label className="block text-sm font-medium text-gray-700"
                       htmlFor="description">{title}</label>
                <textarea id="description" rows="4"
                          className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500">
                    {textareaContent}
                </textarea>
            </div>
        </div>
    );
}