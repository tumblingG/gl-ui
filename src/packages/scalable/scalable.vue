<template>
    <div class="gl-scalable-wrapper" :style="{width: w, height: h}">
      <div class="gl-scalable">
        <slot></slot>
      </div>
    </div>
</template>

<script src="./_scalable.js" lang="js"></script>
<style src="./_scalable.less" lang="less" scoped></style>
