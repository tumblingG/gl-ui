// @vue/component
const regexp = /^[\d]+(\%)?$/;

const widthAndHeightCoerce = (v) => {
    if (v[v.length -1] !== '%') return v + 'px';
    return v;
};

const widthAndHeightValidator = (v) => regexp.test(v);

const scaleContent = (e, s) => {
    const {offsetWidth, offsetHeight} = e;
    const scalable = e.querySelector('.gl-scalable');
    const scaleRate = 1 / s;
    scalable.style.width = `${offsetWidth * s}px`;
    scalable.style.height = `${offsetHeight * s}px`;
    scalable.style.transform = `scale(${scaleRate}, ${scaleRate})`;
    scalable.style.webkitTransform = `scale(${scaleRate}, ${scaleRate})`;
    scalable.style.left = `-${offsetWidth / s}px`;
    scalable.style.top = `-${offsetHeight / s}px`;
};

export default {
    name: 'GlScalable',

    components: {},

    mixins: [],

    props: {
        scale: {
            type: Number,
            default: 2
        },

        width: {
            type: String,
            default: '100%',
            validator: widthAndHeightValidator
        },

        height: {
            type: String,
            default: '100%',
            validator: widthAndHeightValidator
        }
    },

    data () {
        return {}
    },

    computed: {
        s () {
           return this.scale < 1 ? 1 : this.scale;
        },

        w () {
           return widthAndHeightCoerce(this.width);
        },

        h () {
            return widthAndHeightCoerce(this.height);
        }
    },

    watch: {},

    mounted () {
        scaleContent(this.$el, this.s);
        window.addEventListener('resize', this.resize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    },

    methods: {
        resize () {
            scaleContent(this.$el, this.s);
        }
    }
}
