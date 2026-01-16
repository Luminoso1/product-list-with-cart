<script>
	import { fade } from 'svelte/transition'
	import { cart } from '../stores/cart.svelte'

	const items = cart.items
	const stats = cart.stats
</script>

<dialog id="modal" transition:fade>
	<h2>Order Confirmed</h2>
	<p>We hope you enjoy your food!</p>

	<div class="confirmed-items">
		<div class="cart-items">
			{#each $items as item (item.id)}
				<div class="cart-item">
					<div class="cart-info">
						<img src={item.dessert.image.thumbnail} alt={item.dessert.name} />
						<div>
							<h4 class="item-name">{item.dessert.name}</h4>
							<p class="item-details">
								<span class="item-quantity">{item.quantity}x</span>
								<span class="item-price">@ {item.dessert.price.toFixed(2)}</span>
							</p>
						</div>
					</div>
					<p>
						<span class="item-total">${(item.quantity * item.dessert.price).toFixed(2)}</span>
					</p>
				</div>
			{/each}
		</div>

		<h3 class="order-total">
			<span>Order total</span>
			<span class="total-amount">${$stats.total.toFixed(2)}</span>
		</h3>
	</div>

	<button
		commandfor="modal"
		command="close"
		class="confirm-button"
		onclick={() => cart.confirmOrder()}>Start New Order</button
	>
</dialog>

<style>
	dialog {
		max-width: 37rem;
		width: 100%;
		margin: auto;
		border: none;
		border-radius: 0.875rem;
		padding: clamp(1.5rem, 4vw, 2.5rem);
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	h2 {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--rose-900);
	}

	dialog p {
		color: var(--rose-500);
	}

	.confirmed-items {
		margin: 2rem 0;
		padding: 1.5rem;
		border-radius: 0.5rem;
		background-color: var(--rose-50);
	}

	.cart-info {
		height: 100%;
		display: flex;
		gap: 1rem;
	}

	img {
		height: 48px;
		width: 48px;
		object-fit: contain;
	}

	.order-total {
		margin-top: 2rem;
	}
</style>
