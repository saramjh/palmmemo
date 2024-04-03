import connectDB from "@/libs/database"
import Product from "@/models/ProductModel"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
	const { id } = params
	await connectDB()
	const product = await Product.findOne({ _id: id })
	return NextResponse.json({ product }, { status: 200 })
}

export async function PUT(req, { params }) {
	const { id } = params
	const { newName: name, newImage: image, newPrice: price, newCategory: category } = await req.json()
	await connectDB()
	await Product.findByIdAndUpdate(id, { name, image, price, category })
	return NextResponse.json({ message: "product updated" }, { status: 201 })
}

export async function DELETE(req, { params }) {
	const { id } = params
	await connectDB()
	await Product.findByIdAndDelete(id)
	return NextResponse.json({ message: "product deleted" }, { status: 200 })
}
