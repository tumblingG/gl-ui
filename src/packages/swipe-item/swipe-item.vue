<script lang="ts">
import 'reflect-metadata';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlSwipeItem'
})
export default class SwipeItem extends Vue {
    mounted() {
        this.$parent && (this.$parent as any).swipeItemCreated(this);
    }

    destroyed() {
        this.$parent && (this.$parent as any).swipeItemDestroyed(this);
    }
}
</script>

<template src="./swipe-item.html"></template>
