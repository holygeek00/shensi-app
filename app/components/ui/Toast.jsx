// 自定义一个toast组件
import {createRoot} from 'react-dom/client';
import {useCallback, useState} from 'react'
import {cn} from "classnames";

export function ZMessage(message, {type = 'success', duration = '5000'}) {

    let containerRoot = null;
    let timerList = [];
    let list = [];

    const addMsg = (msg) => {
        list.push(msg);
        renderMsgList(msg);
    }


    const removeMsg = (args, id) => {
        list.splice(id, 1);

        // 先把要删除的计时器清空
        clearTimeout(timerList[id]);
        // 再从全局删除
        timerList.splice(id, 1);
        renderMsgList();
    }

    const renderMsgList = (message) => {
        containerRoot = createContainer();
        containerRoot.render(<MessageTemplate message={message} list={list} type={type}/>);
    }

    const createContainer = () => {
        if (containerRoot) {
            return containerRoot
        }
        const div = document.createElement("div");
        document.body.appendChild(div);
        const container = createRoot(div);

        return container;
    }

    // 在计时结束后
    const timer = () => {
        setTimeout(() => {
            // 删去该条消息并重新渲染
            removeMsg();
        }, 5000);
    }

    // 第一，将该条消息存入全局并渲染
    addMsg(message);

    timer();

    // 计时器也存储到全局
    timerList.push(timer);
}

const MessageTemplate = ({message, list, type}) => {
    // 如果没有传入参数，设置默认值
    const getPosition = useCallback(() => {
        // 传入正确的位置 或 没有传
        if (posList.includes(position)) {
            return styles[position]
        }
        // 传入错误的位置
        throw new Error("位置错误");
    }, [])

    // 点击关闭按钮时执行
    const quit = (index) => {
        removeMsg(args, index);
    }

    return (<div className="toast toast-top toast-center fixed z-50">
        {list === undefined ? '' : list.map((item, index) => (// eslint-disable-next-line react/jsx-key
            <div key={index} role="alert" className={`alert shadow-lg alert-${type}`}>
                <span>{item}</span>
            </div>))}
    </div>)
}

