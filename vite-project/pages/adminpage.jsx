import { Link,  Route, Routes } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";


export default function Adminpage(){

    return(
        <div className="w-screen h-screen bg-purple-500 flex">
            <div className="w-[300px] h-full bg-green-800">
                <div className="w-full h-[100px] bg-blue-300 flex items-center">
                    <img src="src/assets/chat gpt.png" className="h-full"/>
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
                        <Route path="/" element={<h1>this is admin path</h1>}></Route>
                        <Route path="/users" element={<h1>this is users path</h1>}></Route>
                        <Route path="/products" element={<h1>this is products path</h1>}></Route>
                        <Route path="/reviews" element={<h1>this is reviews path</h1>}></Route>
                        <Route path="/*" element={<h1>go home page</h1>}></Route>
                </Routes>
            </div>

            
        </div>

    )
}