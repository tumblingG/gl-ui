<script lang="ts">
import 'reflect-metadata';
import {Component, ModelSync, Watch, Prop, Vue} from 'vue-property-decorator';
import {PredefinedColors} from '@/packages/interface';
import Hairline from '../hairline/hairline.vue';

interface CheckboxOptions {
    disabled?: boolean;
    label?: string;
    value: any;
}

@Component({
    name: 'GlCheckbox',
    components: {Hairline}
})
export default class Checkbox extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({required: true}) readonly options!: Array<CheckboxOptions | string>;
    @Prop({default: 'left'}) readonly align!: 'left' | 'right';
    @Prop({default: -1}) readonly max!: Number;

    @ModelSync('value', 'change')
    readonly checkedValue!: Array<any> | boolean;

    get classList (): {[key: string]: boolean} {
        return {
            'is-right': this.align === 'right',
            'is-limit': Array.isArray(this.checkedValue) && this.max <= this.checkedValue.length
        };
    }

    get colorClassList (): Array<string> {
        return [`gl-checkbox-color-${this.color}`];
    }

    get limit(): boolean {
        if (Array.isArray(this.checkedValue)) {
            return this.max < this.checkedValue.length;
        }
        return false;
    }

    @Watch('checkedValue', {deep: true})
    onCheckedValueChange(val: Array<string> | boolean): void {
        if (Array.isArray(val) && this.limit) {
            this.$nextTick(() => {
                val.pop();
                this.$emit('change', val);
            });
        }
    }
}
</script>

<template src="./checkbox.html"></template>
