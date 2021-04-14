<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

type PredefinedColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning'
    | 'danger' | 'light' | 'medium' | 'dark';

@Component({
    name: 'GlBubblingSpinner'
})
export default class BubblingSpinner extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({default: 0}) readonly size!: number;

    get spinnerSize(): string {
        return ((this.size || (this.$parent as any).size || 28) / 3) + 'px';
    }

    get spinnerStyle() {
        return {
            width: this.spinnerSize,
            height: this.spinnerSize,
            background: '#ccc'
        };
    }
}
</script>

<template src="./bubbling-spinner.html"></template>
