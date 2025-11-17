import { Link, Route, Routes } from "react-router-dom";

export default function Header(){
return(
<header className="w-full h-[100px] flex bg-[#051743] text-white flex items-center justify-between px-6 shadow-md fixed top-0 left-0 z-50 ">
            <img src="/logo.png" className="h-full" alt="logo" />
            <div className="w-full h-full flex text-xl text-primary justify-center items-center  gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>         
            </div>

            
        </header>
)}

