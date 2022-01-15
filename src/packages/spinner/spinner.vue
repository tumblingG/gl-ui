<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CircleSpinner from './circle-spinner/circle-spinner.vue';
import BubblingSpinner from './bubbling-spinner/bubbling-spinner.vue';

import { PredefinedColors } from '../interface';

@Component({
    name: 'GlSpinner',
    components: {
        CircleSpinner,
        BubblingSpinner
    }
})
export default class Spinner extends Vue {
    @Prop({default: 'primary'}) readonly color!: PredefinedColors;
    @Prop({default: 'bubbling'}) readonly type!: 'bubbling' | 'circle';
    @Prop({default: 28}) readonly size!: Number;

    get spinner(): string {
        return `${this.type}-spinner`;
    }
}
</script>

<template src="./spinner.html"></template>
