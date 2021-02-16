<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlLoading'
})
export default class Loading extends Vue {
    tips = '';
    state: 1 | 2 = 1;

    show (tips: string): void {
        this.tips = tips;
        this.state = 2;
    }

    hide (): void {
        this.state = 1;
    }
}
</script>

<template src="./loading.html"></template>
