import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderinfo";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKENDURL + "/orders", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((response) => {
					setOrders(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div className="w-full flex justify-center p-10 bg-gray-50 text-gray-800">
			{loaded ? (
				<table className="w-full max-w-7xl table-auto border-collapse rounded-xl overflow-hidden shadow-lg bg-white">
					<thead className="sticky top-0">
						<tr className="bg-gray-800 text-white">
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Order ID
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Customer email
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Customer name
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Date
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Status
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Total Amount
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-200">
						{orders.map((order, index) => {
							return (
								<tr
									key={index}
									className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition"
								>
									<td className="px-5 py-3 text-sm text-gray-700">
										{order.orderId}
									</td>

									<td className="px-5 py-3 text-sm text-gray-700">
										{order.email}
									</td>

									<td className="px-5 py-3 text-sm text-gray-700">
										{order.name}
									</td>

									<td className="px-5 py-3 text-sm text-gray-700">
										{new Date(order.date).toLocaleDateString()}
									</td>

									<td className="px-5 py-3 text-sm text-gray-700">
										{order.status}
									</td>

									<td className="px-5 py-3 text-sm text-gray-700">
										LKR. {order.total.toFixed(2)}
									</td>

									<td className="px-5 py-3 text-sm text-gray-700">
										<ViewOrderInfo order={order} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<Loader />
			)}
		</div>
	);
}
