import { Schema, model, models } from "mongoose"

const topicSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
)

const ProductModel = models.Product || model("Product", topicSchema)

export default ProductModel
