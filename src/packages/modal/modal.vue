<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GlModal'
})
export default class Modal extends Vue {

}
</script>

<template src="./modal.html"></template>
<style src="./modal.less" lang="less" scoped></style>
