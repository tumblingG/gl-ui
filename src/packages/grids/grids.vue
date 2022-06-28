<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr
};

@Component({
  name: 'GlGrids'
})
export default class Grids extends Vue {
  @Prop({default: 3}) readonly row!: number | string;
  @Prop({default: 3}) readonly col!: number | string;
  @Prop({default: true}) readonly border!: boolean;
  @Prop({required: true}) readonly items!: Array<string>;

  get rows() {
    return range(parseInt(this.row + ''));
  }

  get cols() {
    return range(parseInt(this.col + ''));
  }

  @Emit('cellClick')
  cellClicked(cellIndex) {}
}
</script>

<template src="./grids.html"></template>
