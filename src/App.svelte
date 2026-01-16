<script lang="ts">
	import type { Dessert } from './lib/types'
	import DessertList from './lib/components/dessert-list.svelte'
	import CartList from './lib/components/cart-list.svelte'
	import ConfirmOrder from './lib/components/confirm-order.svelte'
	import { dessertsData } from './lib/data'

	let desserts = $state<Dessert[]>(dessertsData)
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
