import IconFont from './IconFont';


const components = {
    IconFont,
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => { Vue.component(key, components[key]); });
};
export default install;