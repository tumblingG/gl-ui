<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Ref, Watch, Emit } from 'vue-property-decorator';
import Hairline from '../hairline/hairline.vue';


type inputType = 'text' | 'password' |  'email' | 'url' | 'tel' | 'textarea';

const typeValidator = (type: string) => {
    return ['text', 'password', 'email', 'url', 'tel', 'textarea'].indexOf(type) !== -1;
};

@Component({
    name: 'GlInput',
    components: {Hairline}
})
export default class Input extends Vue {
    @Ref() readonly input!: HTMLInputElement;

    @Prop({default: 'text', validator: typeValidator}) readonly type!: inputType;
    @Prop({default: ''}) readonly label!: string;
    @Prop({default: ''}) readonly placeholder!: string;
    @Prop({default: ''}) readonly value!: string | number;
    @Prop({default: false}) readonly required!: boolean;
    @Prop({default: true}) readonly clear!: boolean;
    @Prop({default: false}) readonly disabled!: boolean;
    @Prop({default: false}) readonly readonly!: boolean;
    @Prop({default: '1'}) readonly rows!: string;
    innerValue: string | number = '';
    showClearButton = false;
    private lock = false;

    @Watch('value', {immediate: true})
    onOuterValueChange(val: string | number) {
        this.innerValue = val;
    }

    @Watch('innerValue')
    onInnerValueChange(val: string | number) {
        this.showClearButton = val !== ''
    }

    handleInput(e: InputEvent): void {
        if (this.lock) {
            e.preventDefault();
            return;
        }
        this.$emit('input', this.innerValue, e)
    }

    @Emit('focus')
    onFocus(e: InputEvent) {
        this.showClearButton = this.innerValue !== '';
    }

    @Emit('blur')
    onBlur(e: InputEvent) {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.showClearButton = false
        }, 0);
    }

    compositionStart(): void {
        this.lock = true;
    }

    compositionEnd(e: InputEvent): void {
        this.lock = false;
        this.$emit('input', this.innerValue, e)
    }

    clearValue() {
        this.innerValue = '';
        this.$emit('input', '');
        this.showClearButton = false;
        this.input.focus();
    }

    updateValue (value: string | number): void {
        this.innerValue = value;
        this.$emit('input', value);
    }
}
</script>

<template src="./input.html"></template>

