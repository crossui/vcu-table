import IconFont from './IconFont';
import Popper from './popper';
import DateTime from './dateTime';
import AutoTypewrit from './autoTypewrit';
import TableList from './tableList';
import DraggableResizable from './draggableResizable';


const components = {
    IconFont,
    Popper,
    DateTime,
    AutoTypewrit,
    TableList,
    DraggableResizable
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => { Vue.component(key, components[key]); });
};
export default install;