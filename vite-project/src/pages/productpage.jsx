import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productcards";
import Loader from "../components/loader";

export default function ProductPage(){

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if(!loaded){
            axios
				.get(import.meta.env.VITE_BACKENDURL + "/products")
				.then((response) => {
					console.log(response.data);
					setProducts(response.data);
					setLoaded(true);
				});
        }

    },[])

    return (
		<div className="w-full h-[calc(100vh-100px)]">
			{!loaded ? (
				<Loader />
			) : (
				<div className="w-full flex justify-center p-4 flex-row flex-wrap text-accent">
	<div className="w-full h-[110px] sticky top-0 transparent flex justify-center items-center mb-4 shadow-lg z-20 mt-24">
		<div className="relative w-full max-w-xl">
			<span className="absolute left-4 top-1/2 -translate-y-1/2 text-white-400 text-lg">
				🔍
			</span>

			<input
				type="text"
				placeholder="Search products..."
				className="w-full pl-12 pr-4 py-3 border border-secondary/30 rounded-2xl outline-none text-white/50 bg-gray-50/25 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-secondary/40 focus:bg-white focus:border-secondary"
				onChange={async (e) => {
					if (e.target.value === "") {
						setLoaded(false);
						await axios
							.get(import.meta.env.VITE_BACKENDURL + "/products")
							.then((response) => {
								setProducts(response.data);
								setLoaded(true);
							});
						setLoaded(true);
					} else {
						await axios
							.get(
								import.meta.env.VITE_BACKENDURL +
									"/products/search/" +
									e.target.value
							)
							.then((response) => {
								setProducts(response.data);
							});
						setLoaded(true);
					}
				}}
			/>
		</div>
	</div>

	{products.map((item) => {
		return <ProductCard key={item.productid} product={item} />;
	})}
</div>

			)}
		</div>
	);
}