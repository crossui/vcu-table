import IconFont from './IconFont';
import Popper from './popper';
import DateTime from './dateTime';
import AutoTypewrit from './autoTypewrit';
import TableList from './tableList';
import DraggableResizable from './draggableResizable';
import { Splitpanes, Pane } from './splitpanes';


const components = {
    IconFont,
    Popper,
    DateTime,
    AutoTypewrit,
    TableList,
    Splitpanes,
    Pane,
    DraggableResizable
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => { Vue.component(key, components[key]); });
};
export default install;