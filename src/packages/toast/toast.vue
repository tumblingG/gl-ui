<script lang="ts">
import 'reflect-metadata';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlToast'
})
export default class Toast extends Vue {
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

<template src="./toast.html"></template>
