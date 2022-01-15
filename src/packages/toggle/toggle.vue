<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, ModelSync } from 'vue-property-decorator';

import { PredefinedColors } from '../interface';

@Component({
    name: 'GlToggle'
})
export default class Toggle extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({default: false}) readonly disabled!: boolean;

    @ModelSync('value', 'change', {type: Boolean}) readonly checkedValue!: boolean;

    get classList(): {[key: string]: boolean} {
        return {
            'gl-toggle-checked': this.checkedValue,
            'gl-toggle-disabled': this.disabled
        };
    }

    get colorList (): Array<string> | null {
        return this.checkedValue ? [`gl-toggle-color-${this.color}`] : null;
    }
}
</script>

<template src="./toggle.html"></template>
