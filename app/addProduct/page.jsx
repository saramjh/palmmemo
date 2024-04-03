"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddProduct() {
	const [name, setName] = useState("")
	const [image, setImage] = useState("")
	const [price, setPrice] = useState("")
	const [category, setCategory] = useState("")

	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!name || !image) {
			alert("Please fill in all fields")
			return
		}
		if (isNaN(price)) {
			alert("Price must be a number")
			return
		}

		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ name, image, price, category }),
			})
			if (res.ok) {
				router.push("/products")
			} else {
				throw new Error("Failed to add product")
			}
		} catch (error) {
			alert("error")
		}
	}

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="font-bold py-10 text-2xl">Add New Product</h1>
			</div>
			<section className="py-5 rounded-2xl bg-red-100">
				<form className="flex flex-col space-y-2 items-center" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="name here"
						className="input input-bordered input-sm w-full max-w-xs"
						onChange={(e) => {
							setName(e.target.value)
						}}
						value={name}
					/>
					<input
						type="text"
						placeholder="image here"
						className="input input-bordered input-sm w-full max-w-xs"
						onChange={(e) => {
							setImage(e.target.value)
						}}
						value={image}
					/>
					<input
						type="text"
						placeholder="price here"
						className="input input-bordered input-sm w-full max-w-xs"
						onChange={(e) => {
							setPrice(e.target.value)
						}}
						value={price}
					/>
					<input
						type="text"
						placeholder="category here"
						className="input input-bordered input-sm w-full max-w-xs"
						onChange={(e) => {
							setCategory(e.target.value)
						}}
						value={category}
					/>
					<button className="btn btn-active w-80">Submit</button>
					<button className="btn btn-active w-80">Reset</button>
				</form>
			</section>
		</>
	)
}
