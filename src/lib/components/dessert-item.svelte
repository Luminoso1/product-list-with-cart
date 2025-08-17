<script lang="ts">
	import type { Dessert } from '../types'
	import { cart } from '../stores/cart.svelte'

	type Props = {
		dessert: Dessert
		quantity?: number
	}
	let { dessert, quantity = 0 }: Props = $props()

	const { add, setQuantity: update } = cart
</script>

<div>
	<div class={['dessert-card', quantity && 'has-quantity']}>
		<picture>
			<source srcset={dessert.image.desktop} media="(min-width:768px)" />
			<img src={dessert.image.mobile} alt={dessert.name} loading="lazy" class="dessert-image" />
		</picture>

		<div class="action-container">
			{#if quantity > 0}
				<div class="quantity-controls">
					<button onclick={() => update(dessert.id, 1)} class="btn-update">+</button>
					<span>{quantity}</span>
					<button onclick={() => update(dessert.id, -1)} class="btn-update">-</button>
				</div>
			{:else}
				<button class="add-button" onclick={() => add(dessert)}>Add to cart</button>
			{/if}
		</div>
	</div>

	<div class="dessert-info">
		<h2>{dessert.category}</h2>
		<h3>{dessert.name}</h3>
		<p>${dessert.price.toFixed(2)}</p>
	</div>
</div>

<style>
	.dessert-card {
		position: relative;
		border: 2px solid transparent;
		border-radius: 0.5rem;
	}

	.dessert-card.has-quantity {
		border-color: var(--red);
	}

	.dessert-image {
		border-radius: 0.5rem;
		display: block;
		width: 100%;
		height: auto;
	}

	.action-container {
		position: absolute;
		bottom: -1rem;
		left: 2rem;
		width: 66.6667%;
		margin: 0 auto;
		overflow: hidden;
		border: 1px solid var(--red);
		background: var(--white);
		border-radius: 9999px;
	}

	.quantity-controls {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: var(--red);
		padding: 0.5rem 0;
		color: var(--white);
	}

	.add-button {
		width: 100%;
		padding: 0.5rem 0;
		background: none;
	}

	.dessert-info {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
	}

	.btn-update {
		border: none;
		width: 20px;
		height: 20px;
		display: grid;
		place-content: center;
		border-radius: 100vw;
	}
</style>
