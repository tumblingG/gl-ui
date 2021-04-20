<script lang="ts">
import 'reflect-metadata';
import { Component } from 'vue-property-decorator';
import SpinnerCommon from '../spinner-common';

@Component({
    name: 'GlCircleSpinner'
})
export default class CircleSpinner extends SpinnerCommon {}
</script>

<template src="./circle-spinner.html"></template>
