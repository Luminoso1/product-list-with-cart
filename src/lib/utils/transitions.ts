import { quintOut } from 'svelte/easing'
import { crossfade } from 'svelte/transition'

export const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 200),
	fallback() {
		return {
			duration: 300,
			easing: quintOut,
			css: (t) => `
				transform: scale(${t});
				opacity: ${t}
			`
		}
	}
})
