<script lang="ts">
	import type { Dessert } from './lib/types'
	import DessertList from './lib/components/dessert-list.svelte'
	import { onMount } from 'svelte'
	import CartList from './lib/components/cart-list.svelte'
	import ConfirmOrder from './lib/components/confirm-order.svelte'

	let desserts = $state<Dessert[]>([])

	onMount(() => {
		async function doFetch() {
			const baseUrl = import.meta.env.BASE_URL
      console.log(baseUrl)
			const res = await fetch(`${baseUrl}data.json`)

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
	<ConfirmOrder />
</main>

<style>
	main {
		max-width: 1280px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
		padding: 3rem 2rem;
	}

	@media (width >= 1024px) {
		main {
			flex-direction: row;
		}
	}
</style>
