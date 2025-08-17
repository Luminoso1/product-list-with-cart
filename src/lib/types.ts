export type Image = {
	thumbnail: string
	mobile: string
	tablet: string
	desktop: string
}

export type Dessert = {
	id: string
	image: Image
	name: string
	category: string
	price: number
}

export type CartItem = {
	id: string
	dessert: Dessert
	quantity: number
}
