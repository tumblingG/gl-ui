<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlSkeleton'
})
export default class Skeleton extends Vue {
    @Prop({default: false}) readonly animated!: boolean;
}
</script>

<template src="./skeleton.html"></template>
