<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import {PredefinedColors} from '../interface';

@Component({
    name: 'GlButton'
})
export default class Button extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({default: 'default'}) readonly fill!: 'clear' | 'outline' | 'default';
    @Prop({default: 'default'}) readonly size!: 'small' | 'default' | 'large';
    @Prop({default: 'button'}) readonly type!: 'submit' | 'reset' | 'button';
    @Prop({default: 'block'}) readonly expand!: 'full' | 'block' | 'inline';
    @Prop({default: false}) readonly isLoading!: boolean;
    @Prop({default: false}) readonly disabled!: boolean;

    get classList () {
        return [
            `gl-button-fill-${this.fill}`,
            `gl-button-size-${this.size}`,
            `gl-button-expand-${this.expand}`,
            `gl-button-color-${this.color}`
        ];
    }

    @Emit('click')
    handleClick (event: Event) {}
}
</script>

<template src="./button.html"></template>
