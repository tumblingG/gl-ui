/**
 * 寻找指定节点的指定类名的父节点
 * @param className {string} 类名
 * @param el {HTMLElement} 开始节点
 * @param endEl {HTMLElement} 结束节点
 * @return {null| HTMLElement}
 */
export function findParentNodeByClassName (className: string, el: HTMLElement, endEl = document.body): HTMLElement | null {
  if (el.classList.contains(className)) return el;

  let parent: HTMLElement | null = null;
  let next = el;
  while (next && next !== endEl) {
    const parentNode = next.parentNode as HTMLElement;
    if (parentNode && parentNode.classList.contains(className)) {
      parent = parentNode;
      break;
    } else {
      next = parentNode;
    }
  }
  return parent;
}

const BASE_UID = new Date().getTime();

/**
 * 获取唯一的模态框Id
 * @return {string}
 */
export function createUid (): string {
  return `gl-modal-${BASE_UID + 1}`;
}

/**
 * 封装添加事件
 * @param el {HTMLElement} 绑定事件的dom
 * @param type {string} 事件类型，如touchstart
 * @param fn {function} 回调函数
 * @return {function} 取消绑定的函数，执行该函数将会取消绑定
 */
export function addEvent(el: HTMLElement, type: string, fn: any): (() => void) {
  el.addEventListener(type, fn);
  return () => el.removeEventListener(type, fn);
}


