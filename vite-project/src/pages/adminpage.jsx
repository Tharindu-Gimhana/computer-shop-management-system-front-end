import { Link,  Route, Routes } from "react-router-dom";
// Using specific icons for a modern, semantic look
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import Adminproductpage from "./admin/adminproductpage";
import Adminaddproductpage from "./admin/adminaddproductpage";
import Adminupdateproducts from "./admin/adminupdateproducts";
import AdminOrdersPage from "./admin/adminorderspage";
import { useState } from "react";
import Loader from "../components/loader";
import { useEffect } from "react";
import axios from "axios";

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

 return(
         // Modern background color (e.g., light-gray or white) and better layout structure
        <div className="w-screen h-screen bg-gray-100 flex overflow-hidden">
            
            {user ?
            <>
            {/* Sidebar Styling: Darker background, fixed width, modern padding/shadow */}
            <div className="w-64 h-full bg-white shadow-xl flex flex-col z-10">
                {/* Logo/Header Section: Clean, centered, uses a primary color for accent */}
                <div className="bg-indigo-600 p-3 text-white flex items-center justify-center">
                    {/* Assuming 'src/assets/logo.png' is available or replace with a text logo */}
                    <img src="/logo.png" alt="Logo" className=" h-[80px]"/> 
                    <h2 className="text-2xl font-semibold tracking-wider">Admin Panel</h2>
                </div>

                {/* Navigation Links Section: Clean list, hover effects, more space */}
                <nav className="flex flex-col flex-grow p-4 space-y-2">
                    {/* Link Component Styling: Full width, better padding, primary color for active/hover */}
                    <NavLink to="/admin" icon={FaTachometerAlt} label="Dashboard" />
                    <NavLink to="/admin/users" icon={FaUsers} label="Users" />
                    <NavLink to="/admin/products" icon={FaBoxOpen} label="Products" />
                    <NavLink to="/admin/reviews" icon={FaCommentDots} label="Reviews" />
                </nav>
                {/* Logout Button: Placed at the bottom for standard modern practice */}
                <div className="p-4 border-t border-gray-200">
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
            
            {/* Main Content Area Styling: Full height, flex-grow to take remaining space, clean background, slight padding */}
            <main className="flex-1 overflow-auto h-full p-8">
                <Routes path="/">
                        <Route path="/" element={<AdminOrdersPage />}></Route>
                        <Route path="/users" element={<ContentCard title="Users Management"><h1>this is users path</h1></ContentCard>}></Route>
                        <Route path="/products" element={<Adminproductpage></Adminproductpage>}></Route>
                        <Route path="/add-product" element={<Adminaddproductpage/>}></Route>
                        <Route path="/update-product" element={<Adminupdateproducts/>}></Route>
                        
                </Routes>
            </main>
                  </>:
                <Loader />}
            
        </div>

    );
}

// Helper component for cleaner and reusable navigation links
function NavLink({ to, icon: Icon, label }) {
    // Determine if the link is active based on the current path (basic check for demonstration)
    const isActive = window.location.pathname.startsWith(to);

    return (
        <Link 
            to={to} 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium 
                ${isActive 
                    ? 'bg-indigo-100 text-indigo-600 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon className="w-5 h-5" />
            {label}
        </Link>
    );
}

// Helper component for content card/container in the main area
function ContentCard({ title, children }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            {title && <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">{title}</h1>}
            <div className="h-[calc(100%-48px)] overflow-y-auto"> {/* Adjusted height calculation for inner content scroll */}
                {children}
            </div>
        </div>
    );
}