import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
	return (
		<Link
			to={"/overview/" + product.productid}
			className="w-[300px] h-[420px] m-4 rounded-2xl relative cursor-pointer
			bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl
			hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0
			transition-all duration-300"
		>
			{/* Image Section */}
			<div className="w-full h-[250px] relative overflow-hidden rounded-t-2xl">
				<img
					src={product.images[1]}
					className="w-full h-full absolute object-cover"
				/>
				
			</div>

			{/* Content */}
			<div className="w-full h-[170px] p-4 flex flex-col justify-between">
				<h2 className="text-center text-lg font-semibold text-white
  line-clamp-2 break-words">
					{product.name}
				</h2>

				<div className="flex flex-col items-center">
					{product.labelledPrice > product.price && (
						<span className="text-sm text-gray-400 line-through">
							LKR {product.labelledPrice.toFixed(2)}
						</span>
					)}
					<span className="text-2xl font-bold text-amber-400">
						LKR {product.price.toFixed(2)}
					</span>
				</div>
			</div>

			{/* Hover Buttons */}
			<div className="buttons absolute inset-0 opacity-0 flex items-center justify-center
			bg-black/60 backdrop-blur-md transition-opacity duration-300 rounded-2xl">
				<button
					className="px-6 py-3 border border-amber-400 text-amber-400
					hover:bg-amber-400 hover:text-black transition rounded-lg font-semibold"
				>
					View Details
				</button>
			</div>
		</Link>
	);
}
