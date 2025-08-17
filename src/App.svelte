<script lang="ts">
	import type { Dessert } from './lib/types'
	import DessertList from './lib/components/dessert-list.svelte'
	import { onMount } from 'svelte'

	let desserts = $state<Dessert[]>([])

	onMount(() => {
		async function doFetch() {
			const res = await fetch('/data.json')
			desserts = await res.json()
		}
		doFetch()
	})
</script>

<main>
	<!-- Dessert list -->
	<DessertList {desserts} />
	<!-- Catt list   -->
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
