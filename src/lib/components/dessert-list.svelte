<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Dessert } from '../types'
	import DessertItem from './dessert-item.svelte'

	type Props = {
		desserts: Dessert[]
	}

	let { desserts }: Props = $props()
</script>

<section>
	<h1>Desserts</h1>
	<div class="grid-container">
		{#each desserts.slice(0, 9) as dessert, i (dessert)}
			<div in:fly={{ y: 100, duration: 500, delay: i * 250 }}>
				<DessertItem {dessert} />
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		width: 100%;
		max-width: 48rem;
	}

	h1 {
		margin-bottom: 1.5rem;
		font-size: 1.875rem;
		font-weight: bold;
	}

	.grid-container {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
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
