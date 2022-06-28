type eventCallback = (event?: Event) => any;

export const on = (element: HTMLElement, event: string, handler: eventCallback) => {
    if (element && event && handler) {
        if (typeof document.addEventListener === 'function') {
            element.addEventListener(event, handler, false);
        } else {
            (element as any).attachEvent('on' + event, handler);
        }
    }
};

export const off = (element: HTMLElement, event: string, handler: eventCallback) => {
    if (element && event && handler) {
        if (typeof document.removeEventListener === 'function') {
            element.removeEventListener(event, handler, false);
        } else {
            (element as any).detachEvent('on' + event, handler);
        }
    }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const once = (el: HTMLElement, event: string, fn: eventCallback) => {
    const listener = function () {
        if (fn) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line prefer-rest-params
            fn.apply(this, arguments);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};
