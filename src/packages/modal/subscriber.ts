type EventFnType = (params: any) => any;

/**
 * 简易发布订阅系统
 */
class InnerSubscriber {

  events: Map<string, EventFnType[]> = new Map();

  /**
   * 订阅事件
   * @param {string} type 事件类型
   * @param {Function} fn 事件回调函数
   */
  registerEvent (type: string, fn: EventFnType) {
    let eventsArr = this.events.get(type);

    if (Array.isArray(eventsArr)) {
      eventsArr.push(fn);
    } else {
      eventsArr = [fn];
      this.events.set(type, eventsArr);
    }
  }
  /**
   * 撤销订阅
   * @param {string} type 事件类型
   * @param {Function | undefined} fn 事件回调函数，为空将删除所有该类型的事件
   */
  deregisterEvent (type: string, fn?: EventFnType) {
    if (typeof fn !== 'function') {
      this.events.delete(type);
      return;
    }

    const eventsArr = this.events.get(type);
    if (Array.isArray(eventsArr)) {
      const index = eventsArr.findIndex(item => item === fn);
      if (index !== -1) {
        eventsArr.splice(index, 1);
        if (!eventsArr.length) {
          this.events.delete(type);
        }
      } else {
        throw new Error('can not find callback function');
      }
    }
  }

  destroy () {
    this.events.clear();
  }
  /**
   * 通知观察者
   * @param {string} type 事件类型
   * @param {any} params 传递给观察者的参数
   */
  notify (type: string, params: any) {
    const eventsArr = this.events.get(type);
    if (Array.isArray(eventsArr)) {
      eventsArr.forEach(fn => {
        fn(params);
      });
    }
  }
}

export const Subscriber = new InnerSubscriber();
