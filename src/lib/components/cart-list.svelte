<script lang="ts">
	import { flip } from 'svelte/animate'
	import CartItem from './cart-item.svelte'
	import { cart } from '../stores/cart.svelte'
	import { receive, send } from '../utils/transitions'
	import emptyCart from '/src/assets/images/illustration-empty-cart.svg'
	import { fly } from 'svelte/transition'

	const { items, remove } = cart

	const stats = $derived.by(() => {
		let total = 0
		let length = 0
		for (const item of $items) {
			total += item.dessert.price * item.quantity
			length += item.quantity
		}
		return { total, length }
	})
</script>

<section class="cart-container">
	<h2 class="cart-title">Your cart {stats.length}</h2>

	<div class="cart-items">
		{#each $items as item (item.id)}
			<div
				in:receive={{ key: item.id }}
				out:send={{ key: item.id }}
				animate:flip={{ duration: 200 }}
			>
				<CartItem {item} {remove} />
			</div>
		{/each}
	</div>

	{#if !stats.length}
		<div class="empty-cart" in:fly={{ y: 20, duration: 200, delay: 200 }}>
			<img src={emptyCart} alt="Empty cart illustration" />
			<p>Your added items will appear here</p>
		</div>
	{:else}
		<div class="cart-summary">
			<h3 class="order-total">
				<span>Order total:</span>
				<span class="total-amount">${stats.total.toFixed(2)}</span>
			</h3>
			<button class="confirm-button">Confirm Order</button>
		</div>
	{/if}
</section>

<style>
	.cart-container {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 20rem;
		min-width: 20rem;
		flex-grow: 1;
		background-color: var(--white);
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.cart-title {
		margin-bottom: 1rem;
		font-size: 1.25rem;
		font-weight: 500;
	}

	.cart-items {
		max-height: 18rem;
		overflow-y: auto;
		overflow-x: hidden;
		padding-right: 0.5rem;
		margin-bottom: 1rem;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.cart-items::-webkit-scrollbar {
		display: none;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.cart-summary {
		margin-top: 1.5rem;
		padding-top: 1rem;
	}

	.order-total {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		font-weight: 600;
	}

	.total-amount {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--rose-900);
	}

	.confirm-button {
		width: 100%;
		padding: 0.75rem;
		background-color: var(--red);
		color: var(--white);
		border: none;
		border-radius: 9999px;
		cursor: pointer;
		font-size: 1rem;
	}

	.confirm-button:hover {
		background-color: darkred;
	}
</style>
