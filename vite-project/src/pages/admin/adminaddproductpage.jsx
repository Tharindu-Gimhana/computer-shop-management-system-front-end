import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Adminaddproductpage(){
    const[productid , setproductid] =useState("");
    const[name , setname] =useState("");
    const[altnames , setaltnames] =useState("");
    const[description , setdescription] =useState("");
    const[price , setprice] =useState("");
    const[labelledprice , setlabelledprice] =useState("");
    const[images , setimages] =useState("");
    const[category , setcategory] =useState("");
    const[brand , setbrand] =useState("");
    const[model , setmodel] =useState("");
    const[stock , setstock] =useState("");
    const[isavailable , setisavailable] =useState("");
    const navigate = useNavigate();




    async function Addproducts() {


        const token = localStorage.getItem("token");
        console.log("Token:", localStorage.getItem("token"));

        if (token==null){
            console.log("no token found");
            console.log("you have to login as a admin first");
            navigate("/login");
            return;
        }

        if(productid=="" || name=="" || description=="" || price=="" || category=="" || brand=="" || model=="" || stock==""){
            console.log("please fill all the required fields");
            return;
        }

        try{
            const token = localStorage.getItem("token");
            const altnamesinarray = altnames.split(",");
            const imagesinarray = images.split(",");
            console.log("Token:", localStorage.getItem("token"));

            await axios.post("http://localhost:5000/api/products",{
                productid,
                name,
                altnames: altnamesinarray,
                description,
                price: Number(price),
                labelledprice: Number(labelledprice),
                images: imagesinarray,
                category,
                brand,
                model,
                stock: Number(stock),
                isavailable: isavailable === "true", // convert string to boolean
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
        });
        toast.success("product added successfully");
        //navigate("/admin/products");
        }
        catch(err){
            console.log("error during adding product");
            console.log(err);
        
        }

        
    }

    return(
        <div className="w-full h-full flex justify-center text-2xl overflow-y-scroll ">
            <div className="w-[800px] h-full bg-accent/70  p-[20px] flex flex-col rounded-2xl overflow-visible shadow-2xl mb-5">
                <span className="text-[35px] text-left mb-4">Add new product</span>
                <div className="w-full bg-white p-[20px] flex flex-wrap justify-between">
                    <div className="my-[10px] items-start w-full border-amber-950 ">
                       <label className="block text-left w-full text-blue-950 ">product id</label>
                       <input value={productid} 
                       onChange={(e)=>{setproductid(e.target.value)}}
                       className= "w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                       </input>
                       <p className="text-sm  text-blue-950 w-full text-right">sdvsdsdfs</p>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">Name</label>
                       <input value={name} onChange={(e)=>{setname(e.target.value)}} 
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                       <p className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">Alternative names</label>
                       <input value={altnames} onChange={(e)=>{setaltnames(e.target.value)}} 
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">
                       </input>
                        <p className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                     <div className="my-[10px] w-full">
                       <label className="block text-left w-full text-blue-950">Description</label>
                       <textarea value={description} onChange={(e)=>{setdescription(e.target.value)}}
                        className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </textarea>
                       <p className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                    <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">price</label>

                       <input type="number" value={price} onChange={(e)=>{setprice(e.target.value)}}
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                       <p  className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">Labelled price</label>
                       <input type="number" value={labelledprice} onChange={(e)=>{setlabelledprice(e.target.value)}}
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                       <p className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">images</label>
                       <input value={images} onChange={(e)=>{setimages(e.target.value)}}
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                       <p className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">Category</label>
                       <select onChange={(e)=>{setcategory(e.target.value)}}
                        className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">
                        <option value="cpu">CPU</option>
                        <option value="computers">COMPUTERS</option>
                        <option value="laptops">LAPTOPS</option>
                        <option value="hardwares">hARDWARES</option>
                        <option value="ram">RAM</option>
                        <option value="gpu">GPU</option>
                        <option value="others">OTHERS</option>
                        <option value="cables">CABLES</option>
                       </select>

                    
                    </div>

                    <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">Brand</label>
                       <input value={brand} onChange={(e)=>{setbrand(e.target.value)}}
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                       <p className="text-sm text-black-500 w-full text-right"></p>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">Model</label>
                       <input value={model} onChange={(e)=>{setmodel(e.target.value)}}
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">stock</label>
                       <input type="number" value={stock} onChange={(e)=>{setstock(e.target.value)}}
                       className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">

                        </input>
                    </div>

                     <div className="my-[10px]">
                       <label className="block text-left w-full text-blue-950">isavailable</label>
                       <select onChange={(e)=>{setisavailable(e.target.value)}}
                        className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 text-amber-950 focus:ring-amber-950 px-[20px] border-2 border-amber-950 m-2">
                           <option value="true">Yes</option>
                           <option value="false">No</option>
                       </select>
                    </div>

                    <Link to="/admin" className="w-[48%] h-[50px] bg-red-950 text-white flex justify-center items-center rounded-2xl hover:bg-amber-500 mt-4">cancel</Link> 
                    <button className="w-[48%] h-[50px] bg-green-950 text-white flex justify-center items-center rounded-2xl hover:bg-amber-500 mt-4"
                    
                    onClick={
                        Addproducts

                    }>add product</button>


                </div>
            </div>
        </div>
    )
}