<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

type PredefinedColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning'
  | 'danger' | 'light' | 'medium' | 'dark';

@Component
export default class SpinnerCommon extends Vue {
  @Prop({default: 'primary'}) readonly color!: PredefinedColors;
  @Prop({default: 28}) readonly size!: number;

  get spinnerSize(): string {
    return this.size + 'px';
  }

  get spinnerStyle(): {[key: string]: string} {
    return {
      width: this.spinnerSize,
      height: this.spinnerSize
    };
  }
}
</script>
