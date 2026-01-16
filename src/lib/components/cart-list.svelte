<script lang="ts">
	import { flip } from 'svelte/animate'
	import CartItem from './cart-item.svelte'
	import { cart } from '../stores/cart.svelte'
	import { receive, send } from '../utils/transitions'
	import emptyCart from '/src/assets/images/illustration-empty-cart.svg'
	import { fly } from 'svelte/transition'

	const items = cart.items
	const stats = cart.stats
</script>

<section class="cart-container">
	<h2 class="cart-title">Your cart ({$stats.length})</h2>

	<div class="cart-items">
		{#each $items as item (item.id)}
			<div
				in:receive={{ key: item.id }}
				out:send={{ key: item.id }}
				animate:flip={{ duration: 200 }}
			>
				<CartItem {item} remove={() => cart.remove(item.id)} />
			</div>
		{/each}
	</div>

	{#if !$stats.length}
		<div class="empty-cart" in:fly={{ y: 20, duration: 200, delay: 200 }}>
			<img src={emptyCart} alt="Empty cart illustration" />
			<p>Your added items will appear here</p>
		</div>
	{:else}
		<div class="cart-summary">
			<h3 class="order-total">
				<span>Order total</span>
				<span class="total-amount">${$stats.total.toFixed(2)}</span>
			</h3>

			<div class="info">This a carbon-neutral delivery</div>

			<button class="confirm-button" commandfor="modal" command="show-modal">Confirm Order</button>
		</div>
	{/if}
</section>

<style>
	.cart-container {
		flex-basis: 24rem;
		min-height: 20rem;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: var(--white);
		border-radius: 0.5rem;
		padding: 1.5rem;
	}

	.cart-title {
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--red);
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

	.info {
		margin: 1.5rem 0;
		text-align: center;
		padding: 1rem 0;
		border-radius: 0.5rem;
		background-color: var(--rose-50);
	}
</style>
