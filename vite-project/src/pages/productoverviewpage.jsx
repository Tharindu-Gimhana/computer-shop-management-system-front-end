import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import { CgChevronRight } from "react-icons/cg";
import ImageSlider from "../components/imageslider.jsx";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cart.jsx";

export default function ProductOverview(){
    const navigate=useNavigate();
    const params = useParams();
    console.log("params - ", params);
    const [product , setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, error, success

    useEffect(()=>{
        if(status =="loading"){
            
            axios.get(import.meta.env.VITE_BACKENDURL+"/products/"+params.productid).then(
                (response)=>{
                    setProduct(response.data);
                    setStatus("success");
                }
            ).catch(
                ()=>{
                    toast.error("Product Not Found");
                    setStatus("error");
                }
            )
        }
    },[])
    return(
        <>
        {
status == "success" &&
<div className="w-full min-h-[calc(100vh-100px)] flex flex-col lg:flex-row mt-24 px-4 lg:px-10 gap-10">

    {/* Mobile title */}
    <h1 className="lg:hidden text-3xl font-semibold text-white text-center">
        {product.name}
    </h1>

    {/* Image Section */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
        <ImageSlider images={product.images} />
    </div>

    {/* Details Section */}
    <div
        className="w-full lg:w-1/2 p-8 flex flex-col gap-6
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl shadow-xl"
    >
        <h1 className="hidden lg:block text-4xl font-bold text-white">
            {product.name}
        </h1>

        <h2 className="text-sm text-gray-400 tracking-wide">
            Product ID: {product.productid}
        </h2>

        <h3 className="flex items-center gap-2 text-gray-300">
            <CgChevronRight className="text-amber-400" />
            {product.category}
        </h3>

        <p className="text-gray-200 text-justify leading-relaxed max-h-40 overflow-y-auto pr-2">
            {product.description}
        </p>

        {/* Price */}
        <div>
            {product.labelledPrice > product.price && (
                <h2 className="text-gray-400 line-through text-lg">
                    LKR {product.labelledPrice.toFixed(2)}
                </h2>
            )}
            <h2 className="text-amber-400 font-bold text-3xl">
                LKR {product.price.toFixed(2)}
            </h2>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
            <button
                onClick={() => addToCart(product, 1)}
                className="bg-amber-400 text-blue-300 font-semibold
                px-6 py-3 rounded-lg hover:bg-amber-300 transition"
            >
                Add to Cart
            </button>

            <button
                onClick={() => {
                    navigate("/checkout", {
                        state: [{
                            productid: product.productid,
                            name: product.name,
                            price: product.price,
                            labelledPrice: product.labelledPrice,
                            image: product.images[0],
                            quantity: 1
                        }]
                    })
                }}
                className="border border-amber-400 text-amber-400 font-semibold
                px-6 py-3 rounded-lg hover:bg-amber-400 hover:text-black transition"
            >
                Buy Now
            </button>
        </div>
    </div>
</div>
}

        </>
    )
}