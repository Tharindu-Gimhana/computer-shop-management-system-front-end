import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function ViewOrderInfo(props) {
	const order = props.order;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [notes, setNotes] = useState(order.notes);
	const [status, setStatus] = useState(order.status);

	if (!order) return null;

	const formatDateTime = (value) => {
		if (!value) return "-";
		const d = new Date(value);
		return d.toLocaleString();
	};

	const formatCurrency = (value) => {
		if (value == null) return "-";
		return `Rs. ${Number(value).toFixed(2)}`;
	};

	const getStatusBadgeClasses = (status) => {
		switch (status?.toLowerCase()) {
			case "completed":
			case "paid":
				return "bg-green-100 text-green-700 border border-green-200";
			case "cancelled":
			case "canceled":
				return "bg-red-100 text-red-700 border border-red-200";
			case "processing":
				return "bg-blue-100 text-blue-700 border border-blue-200";
			default:
				return "bg-yellow-100 text-yellow-700 border border-yellow-200";
		}
	};

	const orderTotalFromItems =
		Array.isArray(order.items) && order.items.length > 0
			? order.items.reduce(
					(sum, item) => sum + (item.price || 0) * (item.quantity || 0),
					0
			  )
			: order.total;

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				ariaHideApp={false}
				overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
				className="w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl outline-none border border-gray-200"
			>
				<div className="flex flex-col h-full max-h-[90vh]">
					<div className="flex items-start justify-between border-b border-gray-100 px-6 py-4 bg-gray-50 rounded-t-2xl">
						<div>
							<h2 className="text-2xl font-semibold text-gray-800">Order Details</h2>
							<p className="text-sm text-gray-500 mt-1">
								View full order information
							</p>
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
						>
							<span className="text-lg leading-none">&times;</span>
						</button>
					</div>

					<div className="px-6 py-4 space-y-6 overflow-y-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div>
									<p className="text-xs font-semibold text-gray-500 uppercase">Order ID</p>
									<p className="text-sm font-semibold text-gray-800">{order.orderId}</p>
								</div>
								<div>
									<p className="text-xs font-semibold text-gray-500 uppercase">Customer Name</p>
									<p className="text-sm text-gray-800">{order.name}</p>
								</div>
								<div>
									<p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
									<p className="text-sm text-gray-800 break-all">{order.email}</p>
								</div>
								{order.phone && (
									<div>
										<p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
										<p className="text-sm text-gray-800">{order.phone}</p>
									</div>
								)}
							</div>

							<div className="space-y-3">
								<div>
									<p className="text-xs font-semibold text-gray-500 uppercase">
										Order Date &amp; Time
									</p>
									<p className="text-sm text-gray-800">{formatDateTime(order.date)}</p>
								</div>

								<div>
									<p className="text-xs font-semibold text-gray-500 uppercase">
										Status
									</p>
									<div className="flex items-center gap-4">
										<span
											className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeClasses(
												order.status
											)}`}
										>
											{order.status || "pending"}
										</span>

										<select
											value={status}
											onChange={(e) => setStatus(e.target.value)}
											className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
										>
											<option value="pending">Pending</option>
											<option value="processing">Processing</option>
											<option value="completed">Completed</option>
											<option value="cancelled">Cancelled</option>
										</select>
									</div>
								</div>

								<div>
									<p className="text-xs font-semibold text-gray-500 uppercase">
										Total Amount
									</p>
									<p className="text-xl font-bold text-gray-900">
										{formatCurrency(order.total ?? orderTotalFromItems)}
									</p>

									{order.total != null &&
										orderTotalFromItems != null &&
										Number(order.total) !== Number(orderTotalFromItems) && (
											<p className="text-[11px] text-gray-500 mt-0.5">
												Calculated from items:{" "}
												<span className="font-medium">
													{formatCurrency(orderTotalFromItems)}
												</span>
											</p>
										)}
								</div>
							</div>
						</div>

						<div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
							<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
								Delivery Address
							</p>
							<p className="text-sm text-gray-800 whitespace-pre-line">
								{order.address}
							</p>
						</div>

						<div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
							<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
								Additional Notes
							</p>
							<textarea
								className="text-sm text-gray-800 w-full bg-transparent border-0 outline-none resize-none"
								value={notes}
								onChange={(e) => setNotes(e.target.value || null)}
							></textarea>
						</div>

						<div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
							<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
								<p className="text-sm font-semibold text-gray-800">Items in this order</p>
								<p className="text-xs text-gray-500">
									{order.items?.length || 0} item
									{(order.items?.length || 0) !== 1 ? "s" : ""}
								</p>
							</div>

							{Array.isArray(order.items) && order.items.length > 0 ? (
								<div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
									{order.items.map((item, index) => {
										const lineTotal = (item.price || 0) * (item.quantity || 0);
										return (
											<div
												key={`${item.productID}-${index}`}
												className="flex items-center gap-4 px-4 py-3"
											>
												<div className="flex-shrink-0">
													<div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
														{item.image ? (
															<img
																src={item.image}
																alt={item.name}
																className="w-full h-full object-cover"
															/>
														) : (
															<span className="text-xs text-gray-400">
																No image
															</span>
														)}
													</div>
												</div>

												<div className="flex-1 min-w-0">
													<p className="text-sm font-semibold text-gray-800 truncate">
														{item.name}
													</p>
													<p className="text-xs text-gray-500 mt-0.5">
														Product ID: {item.productID}
													</p>
													<p className="text-xs text-gray-500 mt-0.5">
														Qty: {item.quantity} &nbsp;|&nbsp; Unit Price:{" "}
														{formatCurrency(item.price)}
													</p>
												</div>

												<div className="flex-shrink-0 text-right">
													<p className="text-sm font-semibold text-gray-800">
														{formatCurrency(lineTotal)}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className="px-4 py-6 text-center text-sm text-gray-500">
									No items found.
								</div>
							)}
						</div>
					</div>

					<div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50 rounded-b-2xl">
						{(order.notes != notes || order.status != status) && (
							<button
								onClick={() => {
									const token = localStorage.getItem("token");
									axios
										.put(
											import.meta.env.VITE_BACKENDURL + `/orders/${order.orderId}`,
											{
												status: status,
												notes: notes,
											},
											{
												headers: {
													Authorization: `Bearer ${token}`,
												},
											}
										)
										.then(() => {
										    toast.success("Order updated successfully.");
										    window.location.reload();
										    setIsModalOpen(false);
									    })
									    .catch(() => {
										    toast.error("Failed to update order. Try again.");
									    });
								}}
								className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition"
							>
								Save Changes
							</button>
						)}

						<button
							onClick={() => setIsModalOpen(false)}
							className="px-4 py-2 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition"
						>
							Close
						</button>
					</div>
				</div>
			</Modal>

			<button
				className="bg-gray-800 hover:bg-black px-3 py-2 rounded-lg text-white text-sm font-semibold shadow-md transition"
				onClick={() => setIsModalOpen(true)}
			>
				View Info
			</button>
		</>
	);
}
