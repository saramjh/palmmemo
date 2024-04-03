import { useRouter } from "next/navigation"

export default function DelBtn({ id }) {
	const router = useRouter()
	const delProduct = async () => {
		const confirmed = confirm("Are you sure you want to delete this product?")

		if (confirmed) {
			const res = await fetch(`/api/products/${id}`, {
				method: "DELETE",
			})
			if (res.ok) {
				router.refresh()
			}
		}
	}
	return (
		<div>
			<button className="btn btn-warning btn-xs" onClick={delProduct}>
				delete
			</button>
		</div>
	)
}
