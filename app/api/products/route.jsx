import connectDB from "@/libs/database"
import Product from "@/models/ProductModel"
import { NextResponse } from "next/server"

export async function GET() {
	await connectDB()
	const products = await Product.find()
	return NextResponse.json(products)
}

export async function POST(req) {
	const { name, image, price, category } = await req.json()
	await connectDB()
	await Product.create({ name, image, price, category })
	return NextResponse.json({ message: "product created" }, { status: 201 })
}
