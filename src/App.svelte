<script lang="ts">
	import type { Dessert } from './lib/types'
	import DessertList from './lib/components/dessert-list.svelte'
	import { onMount } from 'svelte'
	import CartList from './lib/components/cart-list.svelte'

	let desserts = $state<Dessert[]>([])

	onMount(() => {
		async function doFetch() {
			const res = await fetch('/data.json')

			if (!res.ok) throw new Error('Something went wrong fetching the desserts')

			const data = await res.json()
			for (const item of data) {
				desserts.push({ id: item.name, ...item })
			}
		}
		doFetch()
	})
</script>

<main>
	<DessertList {desserts} />
	<CartList />
</main>

<style>
	main {
		max-width: 1150px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 40px;
		padding: 3rem 2rem;
	}

	@media (width >= 1024px) {
		main {
			flex-direction: row;
		}
	}
</style>
