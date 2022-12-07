const nodeExternals = require('webpack-node-externals');

exports.externals = [{
  vue: 'vue'
}, nodeExternals()];

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules/;