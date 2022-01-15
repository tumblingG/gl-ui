import Vue from 'vue';
import { Subscriber } from './subscriber';
import { findParentNodeByClassName, addEvent } from './utils';

let uniqId = 0;
const events = new Map();

Vue.directive('stop-scroll-chain', {

  inserted: function (el) {
    let startY = 0;
    const modalContent = findParentNodeByClassName('gl-modal-content', el);
    const uid = modalContent!.id;
    el.dataset.eventId = `${++uniqId}`;
    el.classList.add('gl-modal-scroll-el');

    const removeTouchstart = addEvent(el, 'touchstart', function (e: TouchEvent) {
      startY = e.touches[0].pageY;
    });

    const removeTouchmove = addEvent(el, 'touchmove', function (e: TouchEvent) {
      const endY = e.touches[0].pageY;
      const delta = endY - startY;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      if (el.scrollTop === 0 && delta > 0 ||
        (el.scrollTop + clientHeight === scrollHeight && delta < 0)) {
        Subscriber.notify(uid, true);
      } else {
        Subscriber.notify(uid, false);
      }
    });

    events.set(el.dataset.eventId, [removeTouchstart, removeTouchmove])
  },

  unbind: function (el) {
    const eventId = el.dataset.eventId;
    const cancels = events.get(eventId);
    cancels.forEach(cancel => cancel());
    events.delete(eventId);
  }
});

