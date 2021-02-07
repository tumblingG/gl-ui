<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlHairline'
})
export default class Hairline extends Vue {
    @Prop({default: 'bottom'}) readonly position!: 'bottom' | 'top' | 'left' | 'right';

    get classList (): Array<string> {
        return [`gl-hairline-${this.position}`]
    }
}
</script>

<template src="./hairline.html"></template>
