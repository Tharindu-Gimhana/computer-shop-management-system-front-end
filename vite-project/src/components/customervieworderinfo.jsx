import { useState } from "react";
import Modal from "react-modal";

export default function ViewOrderInfoCustomer(props) {
	const order = props.order;
	const [isModalOpen, setIsModalOpen] = useState(false);

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
				return "bg-emerald-100 text-emerald-800 border border-emerald-200";
			case "cancelled":
			case "canceled":
				return "bg-red-100 text-red-800 border border-red-200";
			case "processing":
				return "bg-blue-100 text-blue-800 border border-blue-200";
			default:
				// pending / default
				return "bg-yellow-100 text-yellow-800 border border-yellow-200";
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
			overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
			className="w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl outline-none"
		>
			<div className="flex flex-col h-full max-h-[90vh]">

				{/* Header */}
				<div className="flex items-start justify-between border-b border-gray-200 px-6 py-4 bg-gray-50 rounded-t-2xl">
					<div>
						<h2 className="text-xl font-bold text-gray-800">Order Details</h2>
						<p className="text-sm text-gray-500 mt-1">
							Review the full breakdown of this customer order.
						</p>
					</div>

					<button
						onClick={() => setIsModalOpen(false)}
						className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
						aria-label="Close"
					>
						<span className="text-lg leading-none">&times;</span>
					</button>
				</div>

				{/* Body */}
				<div className="px-6 py-5 space-y-6 overflow-y-auto bg-white">

					{/* Summary */}
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
								<p className="text-xs font-semibold text-gray-500 uppercase">Order Date</p>
								<p className="text-sm text-gray-800">{formatDateTime(order.date)}</p>
							</div>

							<div>
								<p className="text-xs font-semibold text-gray-500 uppercase">Status</p>

								<div className="flex flex-row items-center gap-4 mt-1">
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(order.status)}`}
									>
										<span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
										{order.status || "pending"}
									</span>

									<select
										value={status}
										disabled
										className="px-2 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 bg-gray-50 outline-none"
									>
										<option value="pending">Pending</option>
										<option value="processing">Processing</option>
										<option value="completed">Completed</option>
										<option value="cancelled">Cancelled</option>
									</select>
								</div>
							</div>

							<div>
								<p className="text-xs font-semibold text-gray-500 uppercase">Total Amount</p>
								<p className="text-lg font-bold text-yellow-600">
									{formatCurrency(order.total ?? orderTotalFromItems)}
								</p>

								{order.total != null &&
									orderTotalFromItems != null &&
									Number(order.total) !== Number(orderTotalFromItems) && (
										<p className="text-[11px] text-gray-500 mt-1">
											Calculated from items:{" "}
											<span className="font-medium">
												{formatCurrency(orderTotalFromItems)}
											</span>
										</p>
									)}
							</div>
						</div>
					</div>

					{/* Address Card */}
					<div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
						<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
							Delivery Address
						</p>
						<p className="text-sm text-gray-800 whitespace-pre-line">
							{order.address}
						</p>
					</div>

					{/* Notes */}
					<div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
						<p className="text-xs font-semibold text-gray-500 uppercase mb-1">
							Additional Notes
						</p>
						<textarea
							className="w-full bg-transparent text-sm text-gray-800 resize-none outline-none"
							value={order.notes || "No additional notes provided."}
							disabled
						/>
					</div>

					{/* Items */}
					<div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
						<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
							<p className="text-sm font-semibold text-gray-700">
								Items in this order
							</p>
							<p className="text-xs text-gray-500">
								{order.items?.length || 0} item
								{(order.items?.length || 0) !== 1 ? "s" : ""}
							</p>
						</div>

						{Array.isArray(order.items) && order.items.length > 0 ? (
							<div className="max-h-64 overflow-y-auto divide-y divide-gray-200">
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
														<span className="text-xs text-gray-400">No image</span>
													)}
												</div>
											</div>

											<div className="flex-1 min-w-0">
												<p className="text-sm font-semibold text-gray-800 truncate">
													{item.name}
												</p>

												<p className="text-xs text-gray-500 mt-0.5">
													Product ID: <span className="font-medium">{item.productID}</span>
												</p>

												<p className="text-xs text-gray-500 mt-0.5">
													Qty: <span className="font-medium">{item.quantity}</span>
													&nbsp; | &nbsp; Unit Price:{" "}
													<span className="font-medium">
														{formatCurrency(item.price)}
													</span>
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
								No items found for this order.
							</div>
						)}
					</div>
				</div>
			</div>
		</Modal>

		<button
			className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-white cursor-pointer text-sm font-medium shadow"
			onClick={() => setIsModalOpen(true)}
		>
			View Info
		</button>
	</>
);}
