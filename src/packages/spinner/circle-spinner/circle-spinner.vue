<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

type PredefinedColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning'
    | 'danger' | 'light' | 'medium' | 'dark';

@Component({
    name: 'GlCircleSpinner'
})
export default class CircleSpinner extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({default: 28}) readonly size!: Number;

    get spinnerSize(): string {
        return (this.size || (this.$parent as any).size || 28) + 'px';
    }
}
</script>

<template src="./circle-spinner.html"></template>
