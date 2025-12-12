import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landingpage() {
    return (
        <div
            className="w-screen h-screen bg-[url('/new2.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center max-w-3xl px-6"
            >
                {/* LOGO */}
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl font-bold text-white drop-shadow-lg mb-3"
                >
                    Infinity Computers
                </motion.h1>

                <p className="text-2xl text-gray-300 mb-6 font-light">
                    Your Premium Store for Gaming Gear, Laptops, PCs & Tech Accessories
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-6 mt-6">
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black text-lg font-semibold rounded-full shadow-lg transition-all"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black text-lg font-semibold rounded-full shadow-lg transition-all"
                    >
                        Register
                    </Link>
                </div>

                {/* Bottom tagline */}
                <p className="text-gray-400 mt-10 text-lg italic">
                    “Plug In. Power Up. Play Hard.”
                </p>
            </motion.div>
        </div>
    );
}
