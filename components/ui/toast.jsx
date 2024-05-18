import {createRoot} from 'react-dom/client';

export function ZMessage() {

    let containerRoot = null;

    const createContainer = () => {
        if (containerRoot) {
            return containerRoot
        }
        const div = document.createElement("div");
        document.body.appendChild(div);
        const container = createRoot(div);

        return container;
    }

    const timer = () => {
        setTimeout(() => {

        }, 1000);
    }

    const showToast = (message) => {
        // 实现堆叠样式
        const container = createContainer();
        container.render(
            <div className="toast toast-top toast-center fixed z-50">
                <div role="alert" className="p-5 alert shadow-lg alert-info">
                    {message}
                </div>
            </div>
        );

        // 实现堆叠

        setTimeout(() => {
            container.unmount();
            containerRoot = null;
        }, 10000);
    }

    const info = (message) => {
        const container = createContainer();
        container.render(
            <div className="toast toast-top toast-center fixed z-50">
                <div role="alert" className="p-5 alert shadow-lg alert-info">
                    <span className="lg:w-[350px] sm:w-[230px] text-wrap">{message}</span>
                </div>
            </div>
        );

        setTimeout(() => {
            container.unmount();
            containerRoot = null;
        }, 3000);
    }

    const warning = (message) => {
        const container = createContainer();
        container.render(
            <div className="toast toast-top toast-center fixed z-50">
                <div role="alert" className="alert alert-warning">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6"
                             fill="none"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                    </div>
                    <span className="lg:max-w-[350px] lg:text-nowrap sm:w-[230px] sm:text-wrap">{message}</span>
                </div>
            </div>
        )

        setTimeout(() => {
            container.unmount();
            containerRoot = null;
        },
            3000);
    }

    const error = (message) => {
        const container = createContainer();
        container.render(
            <div className="toast toast-top toast-center fixed z-50">
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="lg:w-[350px] sm:w-[230px] text-wrap">{message}</span>
                </div>
            </div>
        )

        setTimeout(() => {
            container.unmount();
            containerRoot = null;
        }, 3000);
    }

    const success = (message) => {
        const container = createContainer();
        container.render(
            <div className="toast toast-top toast-center fixed z-50">
                <div role="alert" className="alert alert-success flex flex-row items-center justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="lg:w-[350px] sm:w-[230px] text-wrap">{message}</span>
                </div>
            </div>
        )

        setTimeout(() => {
            container.unmount();
            containerRoot = null;
        }, 3000);
    }
    return {
        success,
        info,
        warning,
        error,
        showToast
    }

}
