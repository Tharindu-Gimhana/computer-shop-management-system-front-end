import { Link, Route, Routes } from "react-router-dom";
import ProductPage from "./productpage";
import Header from "../components/header";
import ProductOverview from "./productoverviewpage";
import CartPage from "./cartpage";
import CheckoutPage from "./checkoutpage";

export default function HomePage(){
return(
<>

  
  <Header/>
{/* New colourful space */}
  <div className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-10 rounded-t-3xl text-white min-h-screen w-screen flex-col overflow-auto">
   

  <div className="hidden md:flex items-center gap-8 text-lg">
        <Routes>
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/about" element={<span>About Page</span>} />
                        <Route path="/contact" element={<span>Contact Page</span>} />
                        <Route path="/overview/:productid" element={<ProductOverview />} />
                        <Route path="/*" element={<span>Page not found</span>} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/cart" element={<CartPage />} />
        </Routes>
  </div>
    </div>
</>
)
}
    
