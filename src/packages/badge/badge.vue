<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlBadge'
})
export default class Badge extends Vue {
    @Prop() readonly num!: number | string;
}
</script>

<template src="./badge.html"></template>
