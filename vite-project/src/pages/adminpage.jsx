import { Link,  Route, Routes } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import Adminproductpage from "./admin/adminproductpage";
import Adminaddproductpage from "./admin/adminaddproductpage";
import Adminupdateproducts from "./admin/adminupdateproducts";
import AdminOrdersPage from "./admin/adminorderspage";
import { useState } from "react";
import Loader from "../components/loader";


export default function Adminpage(){
        const [user, setUser] = useState(null);
        useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            window.location.href = "/";
            return;
        }
        axios.get(import.meta.env.VITE_BACKENDURL + "/users/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            if(response.data.role == "admin"){
                setUser(response.data);
            }else{
                window.location.href = "/";
            }
        }).catch(()=>{
            window.location.href = "/login";
        })
    },[])





    return(
        <div className="w-screen h-screen bg-purple-500 flex">
            
            {user ?
            <>
            <div className="w-[300px] h-full bg-green-800">
                <div className="w-full h-[100px] bg-blue-300 flex items-center">
                    <img src="src/assets/react.svg" className="h-full"/>
                    <h2 className="text-2xl">Admin panel</h2>
                </div>

                <div className="w-full h-[calc(100%-100px)] bg-gray-400 border-2 border-amber-500 flex flex-col">
                    <Link to="/admin"  className="flex flex-row items-center gap-[2px] h-[30px]"><FaRegUser /> about</Link>
                    <Link to="/admin/users" className="flex flex-row items-center gap-[2px] h-[30px]"><FaRegUser /> users</Link>
                    <Link to="/admin/products" className="flex flex-row items-center gap-[2px] h-[30px]"><FaRegUser /> products</Link>
                    <Link to="/admin/reviews" className="flex flex-row items-center gap-[2px] h-[30px]"><FaRegUser /> reviews</Link>

                

                </div>
            </div>
            
            <div className="w-[calc(100%-300px)] overflow-y-scroll h-full max-h-full bg-amber-500 border-8 rounded-2xl border-accent">
                <Routes path="/">
                        <Route path="/" element={<AdminOrdersPage />}></Route>
                        <Route path="/users" element={<h1>this is users path</h1>}></Route>
                        <Route path="/products" element={<Adminproductpage></Adminproductpage>}></Route>
                        <Route path="/add-product" element={<Adminaddproductpage/>}></Route>
                        <Route path="/update-product" element={<Adminupdateproducts/>}></Route>
                        
                </Routes>
            </div>
                  </>:
                <Loader />}
            
        </div>

    );
}