<script lang="ts">
import 'reflect-metadata';
import {Component, ModelSync, Prop, Vue} from 'vue-property-decorator';
import Hairline from '../hairline/hairline.vue';
// import {PredefinedColors} from '@/packages/interface';

type PredefinedColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning'
    | 'danger' | 'light' | 'medium' | 'dark';

interface RadioOptions {
    disabled?: boolean;
    label?: string;
    value: any;
}

let uniqRadio = new Date().getTime();

@Component({
    name: 'Radio',
    components: {Hairline}
})
export default class Radio extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({required: true}) options!: Array<RadioOptions | string>;
    @Prop({default: 'left'}) align!: 'left' | 'right';

    @ModelSync('value', 'change') readonly checkedValue!: string;

    get radioName (): string {
        return `gl-radio-${uniqRadio++}`;
    }

    get classList (): Array<string> | null {
        return this.align === 'right' ? ['is-right'] : null
    }

    get colorClassList (): Array<string> {
        return [`gl-radio-color-${this.color}`];
    }
}
</script>

<template src="./radio.html"></template>
