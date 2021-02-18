<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, ModelSync, Watch } from 'vue-property-decorator';

type PredefinedColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning'
    | 'danger' | 'light' | 'medium' | 'dark';

@Component({
    name: 'GlTabs'
})
export default class Tabs extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({default: 'md'}) readonly mode!: 'md' | 'ios';

    @ModelSync('value', 'change', {type: String})
    readonly id!: string;

    get classList (): Array<string> {
        return [
            `gl-tabs-color-${this.color}`,
            `gl-tabs-mode-${this.mode}`
        ];
    }
}
</script>

<template src="./tabs.html"></template>
