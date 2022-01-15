<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { once } from '../../utils/dom';

@Component({
    name: 'GlSwipe'
})
export default class Swipe extends Vue {
    @Prop({default: 300}) readonly speed!: number;
    @Prop({default: 0}) readonly defaultIndex!: number;
    @Prop({default: 3000}) readonly auto!: number;
    @Prop({default: true}) readonly continuous!: boolean;
    @Prop({default: true}) readonly showIndicators!: boolean;
    @Prop({default: true}) readonly noDragWhenSingle!: boolean;
    @Prop({default: false}) readonly prevent!: boolean;
    @Prop({default: false}) readonly stopPropagation!: boolean;

    ready = false;
    dragging = false;
    userScrolling = false;
    animating = false;
    index = 0;
    pages: HTMLElement[] = [];
    timer: any = null;
    reInitTimer: any = null;
    noDrag = false;
    isDone = false;

    private dragState: any = null;

    created() {
        this.dragState = {};
    }

    mounted() {
        this.ready = true;

        this.initTimer();

        this.reInitPages();

        const element = this.$el;

        element.addEventListener('touchstart', (event: Event) => {
            if (this.prevent) event.preventDefault();
            if (this.stopPropagation) event.stopPropagation();
            if (this.animating) return;
            this.dragging = true;
            this.userScrolling = false;
            this.doOnTouchStart(event as TouchEvent);
        });

        element.addEventListener('touchmove', (event: Event) => {
            if (!this.dragging) return;
            if (this.timer) this.clearTimer();
            this.doOnTouchMove(event as TouchEvent);
        });

        element.addEventListener('touchend', (event: Event) => {
            if (this.userScrolling) {
                this.dragging = false;
                this.dragState = {};
                return;
            }
            if (!this.dragging) return;
            this.initTimer();
            this.doOnTouchEnd();
            this.dragging = false;
        });
    }

    destroyed() {
        if (this.timer) {
            this.clearTimer();
        }
        if (this.reInitTimer) {
            clearTimeout(this.reInitTimer);
            this.reInitTimer = null;
        }
    }

    @Watch('index')
    onIndexChange(newIndex: number) {
        this.$emit('change', newIndex);
    }

    swipeItemCreated() {
        if (!this.ready) return;

        clearTimeout(this.reInitTimer);
        this.reInitTimer = setTimeout(() => {
            this.reInitPages();
        }, 100);
    }

    swipeItemDestroyed() {
        if (!this.ready) return;

        clearTimeout(this.reInitTimer);
        this.reInitTimer = setTimeout(() => {
            this.reInitPages();
        }, 100);
    }

    reInitPages() {
        const children = this.$children;
        this.noDrag = children.length === 1 && this.noDragWhenSingle;

        const pages: HTMLElement[] = [];
        const intDefaultIndex = Math.floor(this.defaultIndex);
        const defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length)
        ? intDefaultIndex : 0;
        this.index = defaultIndex;

        children.forEach((child, index) => {
            pages.push(child.$el as HTMLElement);

            child.$el.classList.remove('is-active');

            if (index === defaultIndex) {
                child.$el.classList.add('is-active');
            }
        });

        this.pages = pages;
    }

    rafTranslate(
        element: HTMLElement,
        initOffset: number,
        offset: number,
        callback?: Function,
        nextElement?: HTMLElement
    ) {
        let ALPHA = 0.88;
        this.animating = true;
        let _offset = initOffset;
        let raf = 0;

        const animationLoop = () => {
            if (Math.abs(_offset - offset) < 0.5) {
                this.animating = false;
                _offset = offset;
                element.style.webkitTransform = '';
                if (nextElement) {
                    nextElement.style.webkitTransform = '';
                }
                cancelAnimationFrame(raf);

                if (callback) {
                    callback();
                }

                return;
            }

            _offset = ALPHA * _offset + (1.0 - ALPHA) * offset;
            element.style.webkitTransform = `translate3d(${_offset}px, 0, 0)`;

            if (nextElement) {
                nextElement.style.webkitTransform = `translate3d(${_offset - offset}px, 0, 0)`;
            }

            raf = requestAnimationFrame(animationLoop);
        };

        animationLoop();
    }

    translate(
        element: HTMLElement,
        offset: number,
        speed?: number,
        callback?: Function
    ) {
        if (speed) {
            this.animating = true;
            element.style.webkitTransform = `-webkit-transform ${speed}ms ease-in-out`;
            setTimeout(() => {
                element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
            }, 50);

            let called = false;

            const transitionEndCallback = () => {
                if (called) return;
                called = true;
                this.animating = false;
                element.style.webkitTransition = '';
                element.style.webkitTransform = '';
                if (callback) {
                    callback.apply(this, arguments);
                }
            };

            once(element, 'webkitTransitionEnd', transitionEndCallback);
            setTimeout(transitionEndCallback, speed + 100);
        } else {
            element.style.webkitTransition = '';
            element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
        }
    }

    doAnimate(towards: 'next' | 'prev', options?: any) {
        if (this.$children.length === 0) return;
        if (!options && this.$children.length < 2) return;

        let prevPage: HTMLElement;
        let nextPage: HTMLElement;
        let currentPage: HTMLElement;
        let pageWidth: number;
        let offsetLeft: number;
        let speedX: number;
        let speed = this.speed || 300;
        let index = this.index;
        let pages = this.pages;
        let pageCount = pages.length;

        if (!options) {
            pageWidth = this.$el.clientWidth;
            currentPage = pages[index];
            prevPage = pages[index - 1];
            nextPage = pages[index + 1];
            if (this.continuous && pages.length > 1) {
                if (!prevPage) {
                    prevPage = pages[pages.length - 1];
                }
                if (!nextPage) {
                    nextPage = pages[0];
                }
            }

            if (prevPage) {
                prevPage.style.display = 'block';
                this.translate(prevPage, -pageWidth);
            }
            if (nextPage) {
                nextPage.style.display = 'block';
                this.translate(nextPage, pageWidth);
            }
        } else {
            prevPage = options.prevPage;
            currentPage = options.currentPage;
            nextPage = options.nextPage;
            pageWidth = options.pageWidth;
            offsetLeft = options.offsetLeft;
            speedX = options.speedX;
        }

        let newIndex: number | undefined;

        let oldPage = this.$children[index].$el;

        if (towards === 'prev') {
            if (index > 0) {
                newIndex = index - 1;
            }
            if (this.continuous && index === 0) {
                newIndex = pageCount - 1;
            }
        } else if (towards === 'next') {
            if (index < pageCount - 1) {
                newIndex = index + 1;
            }
            if (this.continuous && index === pageCount - 1) {
                newIndex = 0;
            }
        }

        let callback = () => {
            if (newIndex !== undefined) {
                let newPage = this.$children[newIndex].$el;
                oldPage.classList.remove('is-active');
                newPage.classList.add('is-active');

                this.index = newIndex;
            }
            if (this.isDone) {
                this.end();
            }

            if (prevPage) {
                prevPage.style.display = '';
            }

            if (nextPage) {
                nextPage.style.display = '';
            }
        };

        setTimeout(() => {
            if (towards === 'next') {
                this.isDone = true;
                this.before();
                if (speedX) {
                    this.rafTranslate(currentPage, offsetLeft, -pageWidth, callback, nextPage)
                } else {
                    this.translate(currentPage, -pageWidth, speed, callback);
                    if (nextPage) {
                        this.translate(nextPage, 0, speed);
                    }
                }
            } else if (towards === 'prev') {
                this.isDone = true;
                this.before();
                if (speedX) {
                    this.rafTranslate(currentPage, offsetLeft, pageWidth, callback, prevPage);
                } else {
                    this.translate(currentPage, pageWidth, speed, callback);
                    if (prevPage) {
                        this.translate(prevPage, 0 , speed);
                    }
                }
            } else {
                this.isDone = false;
                this.translate(currentPage, 0, speed, callback);
                if (typeof offsetLeft !== 'undefined') {
                    if (prevPage && offsetLeft > 0) {
                        this.translate(prevPage, pageWidth * (-1), speed);
                    }
                    if (nextPage && offsetLeft < 0) {
                        this.translate(nextPage, pageWidth, speed);
                    }
                } else {
                    if (prevPage) {
                        this.translate(prevPage, pageWidth * (-1), speed);
                    }
                    if (nextPage) {
                        this.translate(nextPage, pageWidth, speed);
                    }
                }
            }
        }, 10);
    }

    next() {
        this.doAnimate('next');
    }

    prev() {
        this.doAnimate('prev');
    }

    before() {
        this.$emit('before', this.index);
    }

    end() {
        this.$emit('end', this.index);
    }

    doOnTouchStart(event: TouchEvent) {
        if (this.noDrag) return;
        const element = this.$el as HTMLElement;
        let dragState = this.dragState;
        let touch = event.touches[0];

        dragState.startTime = new Date();
        dragState.startLeft = touch.pageX;
        dragState.startTop = touch.pageY;
        dragState.startTopAbsolute = touch.clientY;

        dragState.pageWidth = element.offsetWidth;
        dragState.pageHeight = element.offsetHeight;

        let prevPage = this.$children[this.index - 1];
        let dragPage = this.$children[this.index];
        let nextPage = this.$children[this.index + 1];

        if (this.continuous && this.pages.length - 1) {
            if (!prevPage) {
                prevPage = this.$children[this.$children.length - 1];
            }
            if (!nextPage) {
                nextPage = this.$children[0];
            }
        }

        dragState.prevPage = prevPage ? prevPage.$el : null;
        dragState.dragPage = dragPage ? dragPage.$el : null;
        dragState.nextPage = nextPage ? nextPage.$el : null;

        if (dragState.prevPage) {
            dragState.prevPage.style.display = 'block';
        }

        if (dragState.nextPage) {
            dragState.nextPage.style.display = 'block';
        }
    }

    doOnTouchMove(event: TouchEvent) {
        if (this.noDrag) return;

        let dragState = this.dragState;
        let touch = event.touches[0];

        dragState.speedX = touch.pageX - dragState.currentLeft;
        dragState.currentLeft = touch.pageX;
        dragState.currentTop = touch.pageY;
        dragState.currentTopAbsolute = touch.clientY;

        let offsetLeft = dragState.currentLeft - dragState.startLeft;
        let offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

        let distanceX = Math.abs(offsetLeft);
        let distanceY = Math.abs(offsetTop);
        if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
            this.userScrolling = true;
            return;
        } else {
            this.userScrolling = false;
            event.preventDefault();
        }

        offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);

        let towards = offsetLeft < 0 ? 'next' : 'prev';

        if (dragState.prevPage && towards === 'prev') {
            this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
        }
        this.translate(dragState.dragPage, offsetLeft);
        if (dragState.nextPage && towards === 'next') {
            this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
        }
    }

    doOnTouchEnd() {
        if (this.noDrag) return;

        let dragState = this.dragState;

        let dragDuration = new Date().getTime() - dragState.startTime;
        let towards: any = null;

        let offsetLeft = dragState.currentLeft - dragState.startTime;
        let offsetTop = dragState.currentTop - dragState.startTop;
        let pageWidth = dragState.pageWidth;
        let index = this.index;
        let pageCount = this.pages.length;

        if (dragDuration < 300) {
            let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
            if (isNaN(offsetLeft) || isNaN(offsetTop)) {
                fireTap = true;
            }
            if (fireTap) {
                this.$children[this.index].$emit('tap');
            }
        }


        if (dragDuration < 300 && dragState.currentLeft === undefined) return;

        if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
            towards = offsetLeft < 0 ? 'next' : 'prev';
        }

        if (!this.continuous) {
            if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
                towards = null;
            }
        }

        if (this.$children.length < 2) {
            towards = null;
        }

        this.doAnimate(towards, {
            offsetLeft: offsetLeft,
            pageWidth: dragState.pageWidth,
            prevPage: dragState.prevPage,
            currentPage: dragState.dragPage,
            nextPage: dragState.nextPage,
            speedX: dragState.speedX
        });

        this.dragState = {};
    }

    initTimer() {
        if (this.auto > 0 && !this.timer) {
            this.timer = setInterval(() => {
                if (!this.continuous && (this.index >= this.pages.length - 1)) {
                    return this.clearTimer();
                }
                if (!this.dragging && !this.animating) {
                    this.next();
                }
            }, this.auto);
        }
    }

    clearTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
</script>

<template src="./swipe.html"></template>

