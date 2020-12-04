
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
import { oneOf, getStyle, transferIndex, transferIncrease } from './assist';
const Popper = isServer ? function () { } : require('popper.js/dist/umd/popper.js');  // eslint-disable-line

export default {
    props: {
        placement: {
            type: String,
            validator(value) {
                return oneOf(value, ['top', 'bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end']);
            },
            default: 'bottom-start'
        },
        className: {
            type: String
        },
        transfer: {
            type: Boolean
        },
        parentRefs: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            popper: null,
            width: '',
            popperStatus: false,
            tIndex: this.handleGetIndex()
        };
    },
    computed: {
        styles() {
            let style = {};
            if (this.width) style.minWidth = `${this.width}px`;
            style['z-index'] =this.transfer ? 1060 + this.tIndex : 1060;
            return style;
        }
    },
    watch: {
    },
    mounted() {
        this.update();
    },
    render() {
        const {
            $scopedSlots,
            className,
            styles
        } = this;
        const popperProps = {
            ref: `popper-wrap`,
            class: [className],
            style: {
                ...styles
            },
            on: {}
        }
        return (<div {...popperProps}>{$scopedSlots.default ? $scopedSlots.default() : null}</div>)
    },
    methods: {
        update() {
            if (isServer) return;
            if (this.popper) {
                this.$nextTick(() => {
                    this.popper.update();
                    this.popperStatus = true;
                });
            } else {
                this.$nextTick(() => {
                    this.popper = new Popper(this.$parent.$refs[this.parentRefs], this.$el, {
                        placement: this.placement,
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            }
                        },
                        onCreate: () => {
                            this.resetTransformOrigin();
                            this.$nextTick(this.popper.update());
                        },
                        onUpdate: () => {
                            this.resetTransformOrigin();
                        }
                    });
                });
            }
            this.width = parseInt(getStyle(this.$parent.$el, 'width'));
            this.tIndex = this.handleGetIndex();
        },
        destroy() {
            if (this.popper) {
                setTimeout(() => {
                    if (this.popper && !this.popperStatus) {
                        this.popper.destroy();
                        this.popper = null;
                    }
                    this.popperStatus = false;
                }, 300);
            }
        },
        resetTransformOrigin() {
            if (!this.popper) return;
            let x_placement = this.popper.popper.getAttribute('x-placement');
            let placementStart = x_placement.split('-')[0];
            let placementEnd = x_placement.split('-')[1];
            const leftOrRight = x_placement === 'left' || x_placement === 'right';
            if (!leftOrRight) {
                this.popper.popper.style.transformOrigin = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom';
            }
        },
        handleGetIndex() {
            transferIncrease();
            return transferIndex;
        },
    },
    beforeDestroy() {
        if (this.popper) {
            this.popper.destroy();
        }
    }
}
