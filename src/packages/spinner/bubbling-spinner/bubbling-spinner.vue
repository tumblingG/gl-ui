<script lang="ts">
import 'reflect-metadata';
import { Component } from 'vue-property-decorator';
import SpinnerCommon from '../spinner-common';

@Component({
    name: 'GlBubblingSpinner'
})
export default class BubblingSpinner extends SpinnerCommon {
    get spinnerSize(): string {
        return (this.size / 3) + 'px';
    }
}
</script>

<template src="./bubbling-spinner.html"></template>
