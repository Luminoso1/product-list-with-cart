<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Dessert } from '../types'
	import DessertItem from './dessert-item.svelte'
	import { cart } from '../stores/cart.svelte'

	type Props = {
		desserts: Dessert[]
	}

	let { desserts }: Props = $props()

	const cartItems = cart.items
</script>

<section>
	<h1>Desserts</h1>
	<div class="grid-container">
		{#each desserts.slice(0, 9) as dessert, i (dessert)}
			{@const quantity = $cartItems.find((item) => item.dessert.id === dessert.id)?.quantity || 0}
			<div in:fly={{ y: 100, duration: 500, delay: i * 250 }}>
				<DessertItem {dessert} {quantity} />
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		flex-basis: 50rem;
	}

	h1 {
		margin-bottom: 1.5rem;
		font-size: 2.5rem;
		font-weight: bold;
		line-height: 1.2;
	}

	.grid-container {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 1.5rem;
		row-gap: 2rem;
	}

	@media (min-width: 640px) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.grid-container {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
