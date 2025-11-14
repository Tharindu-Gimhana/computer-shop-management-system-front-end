import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Adminproductpage() {
  const [product, setproduct] = useState([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {

   if (!loaded){
    axios
      .get(import.meta.env.VITE_BACKENDURL + "/products")
      .then((Response) => {
        console.log(Response.data);
        setproduct(Response.data);
        setloaded(true);
      });}
  }, [loaded]);

  return (
    <div className="w-full h-full flex flex-col items-center p-6 relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl shadow-lg overflow-auto">
      <h1 className="text-3xl font-semibold mb-6 text-accent tracking-wide">
        Admin Product Dashboard
      </h1>

      <div className="overflow-x-auto w-full rounded-2xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20">
        {loaded ?  <table className="min-w-full text-left border-collapse">
          <thead className="bg-white/10 text-accent uppercase text-sm font-semibold">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Price ($)</th>
              <th className="px-4 py-3">Labelled Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => (
              <tr
                key={item.productid}
                className="border-b border-white/10 hover:bg-white/10 transition-all">
              
                <td className="px-4 py-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover shadow-md"
                  />
                </td>
                <td className="px-4 py-3">{item.productid}</td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">{item.model}</td>
                <td className="px-4 py-3 text-green-400 font-semibold">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-400 line-through">
                  ${item.labelledprice.toFixed(2)}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    item.stock > 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.stock}
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">{item.brand}</td>
                <td
                  className={`px-4 py-3 ${
                    item.isavailable ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.isavailable ? "Yes" : "No"}
                </td>

                <td className="px-3 py-3 text-sm ">
                    <div className="inline-flex items-center gap-2">
                        <button onClick={
                            ()=>{
                                const token = localStorage.getItem("token");
                                console.log("Token: eeeeeeeeee", localStorage.getItem("token"));

                                axios.delete(import.meta.env.VITE_BACKENDURL+"/products/"+item.productid , {
                                    headers:{
                                        Authorization:`Bearer ${token}`
                                    }
                                }).then(
                                    ()=>{
                                        toast.success("Product deleted successfully");
                                        setloaded(false);
                                    })
                            }
                        } className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition">delete</button>

                    </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>: <div className="w-full fixed h-screen top-0 bg-accent/30 ">
                   <div className="h-[50px] w-[40px] bg-amber-900 border-t-transparent rounded-full animate-spin"/>
            
                   </div>     }
      </div>

      <Link
        to="/admin/add-product"
        className="w-[60px] h-[60px] rounded-full bg-accent hover:bg-primary flex justify-center items-center text-white text-4xl shadow-lg hover:scale-110 transition-transform absolute right-8 bottom-8"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
