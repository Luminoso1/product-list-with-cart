<script lang="ts">
	import type { Dessert } from '../types'
	import { cart } from '../stores/cart.svelte'

	type Props = {
		dessert: Dessert
		quantity?: number
	}
	let { dessert, quantity = 0 }: Props = $props()
</script>

<div class={['dessert-card', quantity && 'has-quantity']}>
	<div class="dessert-image">
		<picture>
			<source srcset={dessert.image.desktop} media="(min-width:768px)" />
			<img src={dessert.image.mobile} alt={dessert.name} loading="lazy" />
		</picture>

		<div class="action-container">
			{#if quantity > 0}
				<div class="quantity-controls">
					<button
						type="button"
						onclick={() => cart.setQuantity(dessert.id, -1)}
						class="btn-update"
						aria-label="increment quantity"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="10"
							height="2"
							fill="none"
							viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg
						>
					</button>
					<span>{quantity}</span>
					<button
						type="button"
						onclick={() => cart.setQuantity(dessert.id, 1)}
						class="btn-update"
						aria-label="increment quantity"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="10"
							height="10"
							fill="none"
							viewBox="0 0 10 10"
							><path
								fill="#fff"
								d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
							/></svg
						>
					</button>
				</div>
			{:else}
				<button type="button" class="add-button" onclick={() => cart.add(dessert)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="21"
						height="20"
						fill="none"
						viewBox="0 0 21 20"
						><g fill="#C73B0F" clip-path="url(#a)"
							><path
								d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
							/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" /></g
						><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z" /></clipPath></defs
						></svg
					>
					Add to cart</button
				>
			{/if}
		</div>
	</div>

	<div class="dessert-info">
		<h2 class="category">{dessert.category}</h2>
		<h3 class="name">{dessert.name}</h3>
		<p class="price">${dessert.price.toFixed(2)}</p>
	</div>
</div>

<style>
	.dessert-image {
		position: relative;
		border: 2px solid transparent;
		border-radius: 0.5rem;
	}

	.dessert-card.has-quantity .dessert-image {
		border-color: var(--red);
	}

	.dessert-image img {
		border-radius: 0.5rem;
		display: block;
		width: 100%;
		height: auto;
	}

	.action-container {
		position: absolute;
		bottom: -1rem;
		left: 50%;
		transform: translateX(-50%);
		width: 160px;
		height: 44px;
		margin: 0 auto;
		overflow: hidden;
		border: 1px solid var(--rose-400);
		background: var(--white);
		border-radius: 9999px;
	}

	.action-container:hover {
		border-color: var(--red);
	}

	.quantity-controls {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--red);
		padding: 0 0.75rem;
		color: var(--white);
	}

	.add-button {
		width: 100%;
		height: 100%;
		background: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--rose-900);
	}

	.add-button:is(:hover, :focus) {
		color: var(--red);
		outline-color: var(--red);
	}

	.dessert-info {
		margin-top: 2.25rem;
		display: flex;
		flex-direction: column;
	}
	.category {
		font-size: 0.875rem;
		color: var(--rose-500);
	}
	.name {
		font-weight: 600;
		color: var(--rose-900);
	}
	.price {
		font-weight: 600;
		color: var(--red);
	}

	.btn-update {
		border: none;
		width: 20px;
		height: 20px;
		display: grid;
		place-content: center;
		border-radius: 100vw;
		background: none;
		border: 1.5px solid var(--white);
	}
</style>
