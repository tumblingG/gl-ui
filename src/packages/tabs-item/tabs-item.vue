<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlTabsItem'
})
export default class TabsItem extends Vue {
    @Prop({required: true}) readonly id!: string;

    get classList(): {[key: string]: boolean} {
        return {
            active: (this.$parent as any).id === this.id
        };
    }

    clickItem (): void {
        (this.$parent as any).id = this.id;
    }
}
</script>

<template src="./tabs-item.html"></template>
