<script lang="ts">
	import type { CartItem } from '../types'

	type Props = {
		item: CartItem
		remove: (id: string) => void
	}

	let { item = $bindable(), remove }: Props = $props()
</script>

<div class="cart-item">
	<div>
		<h4 class="item-name">{item.dessert.name}</h4>
		<p class="item-details">
			<span class="item-quantity">{item.quantity}x</span>
			<span class="item-price">@ {item.dessert.price.toFixed(2)}</span>
			<span class="item-total">${(item.quantity * item.dessert.price).toFixed(2)}</span>
		</p>
	</div>
	<button class="remove-button" onclick={() => remove(item.id)}>x</button>
</div>

<style>
	.cart-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ffe4e6;
		padding: 0.5rem 0;
	}

	.item-name {
		font-weight: 500;
		color: var(--rose-900);
		margin: 0;
	}

	.item-details {
		margin: 0;
		display: flex;
		gap: 0.25rem;
		align-items: baseline;
	}

	.item-quantity {
		font-weight: bold;
		color: var(--red);
	}

	.item-price {
		color: var(--rose-500);
	}

	.item-total {
		color: var(--rose-900);
	}

	.remove-button {
		background: none;
		border: none;
		font-size: 1rem;
		cursor: pointer;
		color: var(--rose-900);
	}

	.remove-button:hover {
		color: darkred;
	}
</style>
