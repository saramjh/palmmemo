"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditProductForm({ id, name, image, price, category }) {
	const [newName, setNewName] = useState(name)
	const [newImage, setNewImage] = useState(image)
	const [newPrice, setNewPrice] = useState(price)
	const [newCategory, setNewCategory] = useState(category)

	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!name || !image) {
			alert("Please fill in all fields")
			return
		}
		if (isNaN(newPrice)) {
			alert("Price must be a number")
			return
		}
		try {
			const res = await fetch(`/api/products/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ newName, newImage, newPrice, newCategory }),
			})
			if (res.ok) {
				router.refresh()
				router.push("/products")
			} else {
				throw new Error("Failed to add product")
			}
		} catch (error) {
			alert("error")
		}
	}

	return (
		<section className="py-5 rounded-2xl bg-red-100">
			<div>
				<h1 className="">Edit Page {id}</h1>
			</div>
			<form className="flex flex-col space-y-2 items-center" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="name here"
					className="input input-bordered input-sm w-full max-w-xs"
					onChange={(e) => {
						setNewName(e.target.value)
					}}
					value={newName}
				/>
				<input
					type="text"
					placeholder="image here"
					className="input input-bordered input-sm w-full max-w-xs"
					onChange={(e) => {
						setNewImage(e.target.value)
					}}
					value={newImage}
				/>
				<input
					type="text"
					placeholder="price here"
					className="input input-bordered input-sm w-full max-w-xs"
					onChange={(e) => {
						setNewPrice(e.target.value)
					}}
					value={newPrice}
				/>
				<input
					type="text"
					placeholder="category here"
					className="input input-bordered input-sm w-full max-w-xs"
					onChange={(e) => {
						setNewCategory(e.target.value)
					}}
					value={newCategory}
				/>
				<button className="btn btn-active w-80">Submit</button>
				<button className="btn btn-active w-80">Reset</button>
			</form>
		</section>
	)
}
