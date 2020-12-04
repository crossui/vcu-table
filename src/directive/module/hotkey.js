import { bindEvent, unbindEvent } from './keycodes';
export default {
	bind: (el, binding) => {
		bindEvent(el, binding, {})
	},
	componentUpdated(el, binding) {
		if (el.getAttribute("data-hotkey-enable") === null) {
			unbindEvent(el)
		} else {
			unbindEvent(el)
			bindEvent(el, binding, {})
		}
		/* if (binding.value !== binding.oldValue ) {
			unbindEvent(el)
			bindEvent(el, binding, alias)
		} */
	},
	unbind: unbindEvent
}
