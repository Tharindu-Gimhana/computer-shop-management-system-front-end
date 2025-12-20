import { Link, Route, Routes } from "react-router-dom";
import ProductPage from "./productpage";
import Header from "../components/header";
import ProductOverview from "./productoverviewpage";
import CartPage from "./cartpage";
import CheckoutPage from "./checkoutpage";
import Orderspagecustomer from "./orderspagecustomer";
import Landingpage from "./landingpage";
import Contactpage from "./contactpage";
import Aboutpage from "./aboutpage";

export default function HomePage(){
return(
<>

  
  <Header/>
{/* New colourful space */}
  <div className="flex-1 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white min-h-screen w-screen flex-col overflow-auto  ">
   

  <div className="items-center text-lg">
        <Routes>
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/about" element={<Aboutpage/>} />
                        <Route path="/contact" element={<Contactpage />} />
                        <Route path="/overview/:productid" element={<ProductOverview />} />
                        <Route path="/*" element={<Landingpage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/orders" element={<Orderspagecustomer />} />
        </Routes>
  </div>
    </div>
</>
)
}
    
