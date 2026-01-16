import type { CartItem, Dessert } from '../types'
import { derived, writable } from 'svelte/store'

class CartStore {
	private _items = writable<CartItem[]>([])

	private _stats = derived(this.items, ($items) => {
		let total = 0
		let length = 0
		for (const item of $items) {
			total += item.dessert.price * item.quantity
			length += item.quantity
		}
		return { total, length }
	})

	get items() {
		return this._items
	}

	get stats() {
		return this._stats
	}

	add(dessert: Dessert) {
		const id = crypto.randomUUID().toString()
		this.items.update((prev) => [...prev, { id, dessert, quantity: 1 }])
	}

	setQuantity(id: string, delta: number) {
		this.items.update((c) =>
			c
				.map((n) => (n.dessert.id === id ? { ...n, quantity: Math.max(0, n.quantity + delta) } : n))
				.filter((n) => n.quantity > 0)
		)
	}

	remove(id: string) {
		this.items.update((c) => c.filter((i) => i.id !== id))
	}

	confirmOrder() {
		this.items.set([])
	}
}

export const cart = new CartStore()
