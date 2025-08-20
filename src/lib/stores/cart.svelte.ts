import type { CartItem, Dessert } from '../types'
import { derived, writable } from 'svelte/store'

function createCartStore() {
	const items = writable<CartItem[]>([])
	const stats = derived(items, ($items) => {
		let total = 0
		let length = 0
		for (const item of $items) {
			total += item.dessert.price * item.quantity
			length += item.quantity
		}
		return { total, length }
	})

	function add(dessert: Dessert) {
		const id = crypto.randomUUID().toString()
		items.update((prev) => [...prev, { id, dessert, quantity: 1 }])
	}

	function setQuantity(id: string, delta: number) {
		items.update((c) =>
			c
				.map((n) => (n.dessert.id === id ? { ...n, quantity: Math.max(0, n.quantity + delta) } : n))
				.filter((n) => n.quantity > 0)
		)
	}

	function remove(id: string) {
		items.update((c) => c.filter((i) => i.id !== id))
	}

	function confirmOrder() {
		items.set([])
	}

	return {
		items,
		stats,
		add,
		setQuantity,
		remove,
		confirmOrder
	}
}

export const cart = createCartStore()
