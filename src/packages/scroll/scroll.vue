<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

type callBack = (fn: () => void) => any;

@Component({
    name: 'GlScroll'
})
export default class Scroll extends Vue {
    @Prop({default: 44}) readonly offset!: number;
    @Prop() readonly onRefresh?: callBack;
    @Prop() readonly onInfinite?: callBack;

    top = 0;
    // 0:down, 1: up, 2: refreshing
    state: 0 | 1 | 2 = 0;
    startY = 0;
    touching = false;
    infiniteLoading = false;

    get classList(): {[key: string]: boolean} {
        return {
            'pull-down': this.state === 0,
            'pull-up': this.state === 1,
            refreshing: this.state === 2,
            touching: this.touching
        };
    }

    touchStart (e: TouchEvent): void {
        this.startY = e.targetTouches[0].pageY;
        this.touching = true;
    }

    mouseDown (e: MouseEvent): void {
        this.startY = e.pageY;
        this.touching = true;
    }

    touchMove (e: TouchEvent): void {
        if (this.$el.scrollTop > 0 || !this.touching) {
            return;
        }
        let diff = e.targetTouches[0].pageY - this.startY;
        if (diff > 0) {
            e.preventDefault();
        }
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);

        // in refreshing
        if (this.state === 2) return;

        this.state = this.top >= this.offset ? 1 : 0;
    }

    mouseMove (e: MouseEvent): void {
        if (this.$el.scrollTop > 0 || !this.touching) {
            return;
        }
        let diff = e.pageY - this.startY;
        if (diff > 0) e.preventDefault();
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);

        if (this.state === 2) return;

        this.state = this.top >= this.offset ? 1 : 0;
    }

    touchEnd (e: TouchEvent): void {
        this.touching = false;
        if (this.state === 2) {
            // in refreshing
            this.state = 2;
            this.top = this.offset;
            return;
        }

        if (this.top >= this.offset) {
            // do refresh
            this.refresh();
        } else {
            // cancel refresh
            this.state = 0;
            this.top = 0;
        }
    }

    mouseUp (e: MouseEvent): void {
        this.touching = false;
        if (this.state === 2) { // in refreshing
            this.state = 2
            this.top = this.offset
            return
        }
        if (this.top >= this.offset) { // do refresh
            this.refresh()
        } else {  // cancel refresh
            this.state = 0
            this.top = 0
        }
    }

    refresh (): void {
        this.state = 2;
        this.top = this.offset;
        if (typeof this.onRefresh === 'function') {
            this.onRefresh(this.refreshDone);
        }
    }

    refreshDone (): void {
        this.state = 0;
        this.top = 0;
    }

    infinite (): void {
        this.infiniteLoading = true;
        if (typeof this.onInfinite === 'function') {
            this.onInfinite(this.infiniteDone);
        }
    }

    infiniteDone (): void {
        this.infiniteLoading = false;
    }

    onScroll (e: MouseEvent): void {
        if (this.infiniteLoading) return;

        const outerHeight = this.$el.clientHeight;
        const innerHeight = this.$el.querySelector('.scroll-inner')!.clientHeight;
        const scrollTop = this.$el.scrollTop;
        const ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer')!.clientHeight : 0;
        const infiniteHeight = this.$el.querySelector('.infinite-layer')!.clientHeight;
        const bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

        if (bottom < infiniteHeight) {
            this.infinite();
        }
    }

}
</script>

<template src="./scroll.html"></template>
