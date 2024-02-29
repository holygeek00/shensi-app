// 自定义一个toast组件
import {createRoot} from 'react-dom/client';
import {useCallback, useState} from 'react'

export function ZMessage(message) {

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
        console.log(message)
        containerRoot = createContainer();
        containerRoot.render(<MessageTemplate message={message} list={list}/>);
    }

    const createContainer = () => {
        if (containerRoot) {
            return containerRoot
        }
        const div = document.createElement("div");
        // div.style.zIndex = "10000";
        // div.style.position = "absolute";
        // div.style.top = "0";
        // div.style.left = "0";
        div.style.width = "fit-content";
        // div.style.height = "200px";
        // div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        document.body.appendChild(div);
        const container = createRoot(div);

        return container;
    }

    // 在计时结束后
    const timer = () => {
        setTimeout(() => {
            // 删去该条消息并重新渲染
            removeMsg();
        }, 3000);
    }

    // 第一，将该条消息存入全局并渲染
    addMsg(message);

    timer();

    // 计时器也存储到全局
    timerList.push(timer);
}

const MessageTemplate = ({message, list}) => {
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

    console.log(list)

    return (
        <div className="toast toast-top toast-center">
            {list === undefined ? '' : list.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className="alert bg-gray-200" style={{"width": "fit-content"}}>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    )
}

