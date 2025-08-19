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
	<button class="remove-button" onclick={() => remove(item.id)} aria-label="remove item"
		><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"
			><path
				fill="#CAAFA7"
				d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
			/></svg
		></button
	>
</div>

<style>
	.cart-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ffe4e6;
		padding: 1rem 0;
		font-size: 0.875rem;
	}

	.item-name {
		font-weight: 600;
		margin-bottom: 8px;
		color: var(--rose-900);
	}

	.item-details {
		margin: 0;
		display: flex;
		gap: 0.5rem;
		align-items: baseline;
	}

	.item-quantity {
		font-weight: 600;
		color: var(--red);
	}

	.item-price {
		color: var(--rose-500);
	}

	.item-total {
		font-weight: 600;
		color: var(--rose-500);
	}

	.remove-button {
		background: none;
		border: none;
		font-size: 1rem;
		cursor: pointer;
		width: 20px;
		height: 20px;
		display: grid;
		place-content: center;
		border: 1.5px solid var(--rose-400);
	}

	.remove-button:hover {
		color: darkred;
	}
</style>
