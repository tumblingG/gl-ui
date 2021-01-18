<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlHairline'
})
export default class Hairline extends Vue {
    @Prop({default: 'bottom'}) readonly position!: 'bottom' | 'top' | 'left' | 'right';

    get positionNames (): {[key: string]: boolean} {
        return {
            'gl-hairline-top': this.position === 'top',
            'gl-hairline-bottom': this.position === 'bottom',
            'gl-hairline-left': this.position === 'left',
            'gl-hairline-right': this.position === 'right'
        };
    }
}
</script>

<template src="./hairline.html"></template>
