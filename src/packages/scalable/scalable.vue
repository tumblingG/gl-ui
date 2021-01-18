<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

const regexp = /^[\d]+(%)?$/;

const widthAndHeightCoerce = (v: string) => {
    if (v[v.length -1] !== '%') return v + 'px';
    return v;
};

const widthAndHeightValidator = (v: string) => regexp.test(v);

const scaleContent = (e: Element, s: number) => {
    const {offsetWidth, offsetHeight} = e as HTMLElement;
    const scalable = e.querySelector('.gl-scalable') as HTMLElement;
    const scaleRate = 1 / s;
    scalable.style.width = `${offsetWidth * s}px`;
    scalable.style.height = `${offsetHeight * s}px`;
    scalable.style.transform = `scale(${scaleRate}, ${scaleRate})`;
    scalable.style.webkitTransform = `scale(${scaleRate}, ${scaleRate})`;
    scalable.style.left = `-${offsetWidth / s}px`;
    scalable.style.top = `-${offsetHeight / s}px`;
};

@Component({
    name: 'GlScalable'
})
export default class Scalable extends Vue {
    @Prop({default: 2}) readonly scale!: number;
    @Prop({default: '100%', validator: widthAndHeightValidator}) readonly width!: string;
    @Prop({default: '100%', validator: widthAndHeightValidator}) readonly height!: string;

    get s (): number {
        return this.scale < 1 ? 1 : this.scale;
    }

    get w (): string {
        return widthAndHeightCoerce(this.width);
    }

    get h (): string {
        return widthAndHeightCoerce(this.height);
    }

    mounted (): void {
        scaleContent(this.$el, this.s);
        window.addEventListener('resize', this.resize);
    }

    beforeDestroy (): void {
        window.removeEventListener('resize', this.resize);
    }

    resize (): void {
        scaleContent(this.$el, this.s);
    }
}
</script>

<template src="./scalable.html"></template>
