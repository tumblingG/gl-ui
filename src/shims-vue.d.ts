declare module '*.vue' {
  import Vue from 'vue';
  export default class ElementClass extends Vue {
      [key: string]: any;
  }
}

declare module '*.vue.ts' {
  import Vue from 'vue';
  export default Vue;
}

