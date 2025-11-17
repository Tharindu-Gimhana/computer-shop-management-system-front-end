import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productcards";

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

    return(
        <div className="w-full h-[calc(100vh-100px)] pt-24">
            
                <div className="w-full flex justify-center p-4 flex-row flex-wrap">
                    {
                        products.map(
                            (item)=>{
                                return(
                                    <ProductCard key={item.productid} product={item} />
                                )
                            }
                        )
                    }
                </div>
            

        </div>
    )
}