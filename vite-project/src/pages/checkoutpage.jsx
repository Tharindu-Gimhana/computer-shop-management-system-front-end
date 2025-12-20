import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BsChevronUp } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [cart, setCart] = useState(location.state);

    if(location.state == null){
        navigate("/products");
    }

    function getCartTotal(){
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

	function submitOrder() {
		const token = localStorage.getItem("token");
		if(!token){
			toast.error("You must be logged in to place an order");
			navigate("/login");
			return;
		}

		const orderItems = cart.map(item => ({
			productID: item.productid,
			quantity: item.quantity
		}));

		axios.post(import.meta.env.VITE_BACKENDURL + "/orders", {
			name, address, phone, items: orderItems
		},{
			headers: { "Authorization": `Bearer ${token}` }
		}).then(() => {
			toast.success("Order placed successfully");
			navigate("/orders");
		}).catch(() => {
			toast.error("Error placing order");
		});
	}

	return (
		<div className="w-full flex flex-col items-center mt-24 lg:p-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen pb-10">
            
            {/* Cart Items */}
			{cart.map((item, index) => (
				<div key={index} className="w-full lg:w-[60%] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl my-3 p-4 flex flex-col lg:flex-row items-center gap-4 transition hover:shadow-3xl">
                    
                    {/* Product Image */}
					<img
						src={item.image}
						className="h-[120px] lg:h-[150px] aspect-square rounded-xl object-cover border border-white/20 shadow-md"
					/>

					{/* Product Info */}
					<div className="flex-1 flex flex-col justify-center lg:pl-4 text-white">
						<h1 className="text-lg lg:text-2xl font-semibold">{item.name}</h1>
						<h2 className={`text-md lg:text-lg ${item.labelledPrice > item.price ? "line-through text-gray-400" : "text-amber-400"}`}>
							{item.labelledPrice > item.price ? `LKR. ${item.labelledPrice.toFixed(2)}` : ""}
						</h2>
						<h2 className="text-xl lg:text-2xl font-bold text-accent mt-1">
							LKR. {item.price.toFixed(2)}
						</h2>
						<h3 className="text-sm lg:text-md text-gray-300 mt-1">{item.productid}</h3>
					</div>

					{/* Quantity Controls */}
					<div className="flex flex-col items-center justify-center gap-2">
						<BsChevronUp
							onClick={() => {
								const copiedCart = [...cart];
								copiedCart[index].quantity += 1;
								setCart(copiedCart);
							}}
							className="text-2xl cursor-pointer text-white hover:text-accent transition"
						/>
						<span className="text-lg font-semibold text-white">{item.quantity}</span>
						<BsChevronUp
							onClick={() => {
								const copiedCart = [...cart];
								copiedCart[index].quantity -= 1;
								if(copiedCart[index].quantity < 1) copiedCart.splice(index, 1);
								setCart(copiedCart);
							}}
							className="rotate-180 text-2xl cursor-pointer text-white hover:text-accent transition"
						/>
					</div>

					{/* Item Total */}
					<span className="text-white font-semibold text-lg lg:text-xl w-[100px] text-right">
						LKR. {(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
			))}

            {/* Customer Info Form */}
			<div className="lg:w-[60%] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 my-6 flex flex-col gap-6 text-white">
				<div className="flex flex-col lg:flex-row gap-4 w-full">
					<div className="flex flex-col flex-1">
						<label className="mb-1">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="px-4 py-3 rounded-lg border border-white/30 focus:border-accent outline-none bg-white/20 text-white placeholder-white/70 transition"
							placeholder="Your full name"
						/>
					</div>
					<div className="flex flex-col flex-1">
						<label className="mb-1">Phone</label>
						<input
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="px-4 py-3 rounded-lg border border-white/30 focus:border-accent outline-none bg-white/20 text-white placeholder-white/70 transition"
							placeholder="e.g., 0712345678"
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<label className="mb-1">Address</label>
					<textarea
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="px-4 py-3 rounded-lg border border-white/30 focus:border-accent outline-none bg-white/20 text-white placeholder-white/70 transition resize-none"
						placeholder="Your delivery address"
					/>
				</div>
			</div>

            {/* Order Summary */}
			<div className="lg:w-[60%] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 my-3 flex flex-col lg:flex-row justify-between items-center text-white">
				<button 
					onClick={submitOrder}
					className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition font-semibold w-full lg:w-auto"
				>
					Order Now
				</button>
				<span className="text-xl lg:text-2xl font-bold mt-4 lg:mt-0">
					Total: LKR. {getCartTotal().toFixed(2)}
				</span>
			</div>
		</div>
	);
}
