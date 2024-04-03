"use client"
import Link from "next/link"
import DelBtn from "@/components/DelBtn"

const getProducts = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/products", {
			cache: "no-store",
		})
		const data = await res.json()
		return data
	} catch (error) {
		console.log("Error loading products", error)
	}
}

export default async function ProductsList() {
	const products = await getProducts()
	return (
		<>
			<div className="overflow-x-auto">
				<div className="flex justify-between items-center">
					<h1 className="font-bold py-10 text-2xl">Next.js 14 CRUD</h1>
				</div>
				<div className="text-right">
					<Link className="btn btn-primary" href={"/addProduct"}>
						Add Product
					</Link>
				</div>
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{products
							? products.map((product) => (
									<tr key={product._id}>
										<th>
											<label>
												<input type="checkbox" className="checkbox" />
											</label>
										</th>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle w-12 h-12">
														<img src={product.image} alt="Avatar Tailwind CSS Component" />
													</div>
												</div>
												<div>
													<div className="font-bold">{product.name}</div>
													<div className="text-sm opacity-50">{product.image}</div>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-ghost badge-sm">{product.price}</span>
										</td>
										<td>{product.category}</td>
										<th className="flex flex-col space-y-1">
											<Link href={`/editProduct/${product._id}`}>
												<button className="btn btn-primary btn-xs">Modify</button>
											</Link>
											<DelBtn id={product._id} />
										</th>
									</tr>
							  ))
							: "Loading..."}
					</tbody>
					{/* foot */}
					<tfoot>
						<tr>
							<th></th>
							<th>Name</th>
							<th>price</th>
							<th>category</th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	)
}
