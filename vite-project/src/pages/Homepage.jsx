import { Link, Route, Routes } from "react-router-dom";

export default function HomePage(){
return(
<>

<div class="w-full h-24 bg-[#051743] text-white flex items-center justify-between px-6 shadow-md fixed top-0 left-0 z-50">
  
  <div class="text-2xl font-semibold tracking-wide">
    MyStore
  </div>

  <div class="hidden md:flex items-center gap-8 text-lg">
    <Link to="/" class="hover:text-accent transition">Home</Link>
    <Link to="/products" class="hover:text-accent transition">Products</Link>
    <Link to="/about" class="hover:text-accent transition">About</Link>
    <Link to="/contact" class="hover:text-accent transition">Contact</Link>
  </div>

  
</div>

<div className="min-h-screen w-screen flex flex-col">

  {/* Your existing upload area */}
  <div className="p-6 bg-gray-100">
    {/* existing content */}
  </div>

  {/* New colourful space */}
  <div className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-10 rounded-t-3xl text-white">
    <h2 className="text-3xl font-bold mb-4"></h2>
    <p className="text-lg"></p>
  </div>

</div>


</>
)
}
    
