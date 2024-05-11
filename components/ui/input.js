// 使用react函数式组件，封装一个shacdn/ui类似的input组件
const Input = ({label, value, onChange, type}) => {
    return (
        <div className="flex flex-col space-y-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor={label}>{label}</label>
            <input
                id={label}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-100"
                value={value}
                onChange={onChange}
                type={type}
                placeholder={label}
            />
        </div>
    );
};

export default Input;