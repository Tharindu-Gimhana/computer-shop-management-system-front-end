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
            status == "loading" && <h1 className="text-center mt-10 text-2xl">Loading product...</h1>
        }
        {
            status == "error" && <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
        }
        {
            status == "success" &&
            <div className="w-full h-[calc(100vh-100px)] flex ">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <ImageSlider images={product.images} />
                </div>
                <div className="w-1/2 h-full p-10 flex flex-col gap-8 border-4 border-b-emerald-900 rounded-2xl mt-6 pt-4 ">
                    <h1 className="text-4xl font-semibold">{product.name}</h1>
                    <h2 className="text-lg text-shadow-amber-50/80">{product.productid}</h2>
						<h3 className="text-lg pl-10 text-shadow-amber-50/80 flex items-center">
							<CgChevronRight /> {product.category}
						</h3>
						<p className="pl-15 text-md text-justify text-shadow-amber-50/80   h-32 overflow-y-auto">
							{product.description}
						</p>
						<div className="w-full ">
							{product.labelledPrice > product.price && (
								<h2 className="text-shadow-amber-50/80  line-through decoration-gold/70 decoration-2 mr-2 text-xl">
									LKR. {product.labelledPrice.toFixed(2)}
								</h2>
							)}
                            <h2 className="text-amber-950 font-semibold text-3xl">
                                LKR. {product.price.toFixed(2)}
                            </h2>

                        </div>

                        <div className="w-full flex flex-row gap-4 mt-6">
                            <button 
                            onClick={()=>{
                                addToCart(product, 1)
                            }}
                            className="bg-accent text-white px-6 py-3 rounded hover:bg-accent/90 transition">
                                Add to Cart
                            </button>
                            <button 
                            onClick={()=>{
                                navigate("/checkout", { state: [{
                                    productid: product.productid,
                                    name: product.name,
                                    price: product.price,
                                    labelledPrice: product.labelledPrice,
                                    image: product.images[0],
                                    quantity: 1
                                }] })
                            }} className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition">
                                Buy Now
                            </button>
                            
                        </div>
                </div>

            </div>
        }
        </>
    )
}