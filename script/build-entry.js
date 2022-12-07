const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const components = require('../src/components.json');

const OUTPUT_PATH = path.join(__dirname, '../src/packages/index.js');
const IMPORT_TEMPLATE = 'import {{name}} from \'./{{package}}/index.js\';';
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
const MAIN_TEMPLATE = `/* Automatically generated by './build/build-entry.js' */

{{include}}

const components = [
{{install}},
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$glLoading = Loading;
  Vue.prototype.$glModal = Modal;
  Vue.prototype.$glToast = Toast.alert;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '{{version}}',
  install,
{{list}}
};
`;

const componentNames = Object.keys(components);

const includeComponentTemplate = [];
const installTemplate = [];
const listTemplate = [];

componentNames.forEach(name => {
  const componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  if (['Loading', 'Modal', 'Toast'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }

  listTemplate.push(`  ${componentName}`);
});

const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: require('../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);