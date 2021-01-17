import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
// import GlScalable from '@/packages/scalable/scalable.tsx';
import Scalable from '../packages/scalable/scalable';

@Component({
    name: 'Haha',
    components: {
        'scaleable': Scalable
    }
})
export default class HaHa extends Vue {
    @Prop() config!: string;

    render () {
        return <div>
            <scaleable scale={2} width="200" height="200">
                <div class="item item1">
                    <img class="img" src="../assets/haha3.jpg"/>
                </div>
            </scaleable>
        </div>;
    }
}
