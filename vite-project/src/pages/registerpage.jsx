import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading , setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function register() {


        if(firstName.trim()== ""){
            toast.error("First name is required");
            return;
        }
        if(lastName.trim()== ""){
            toast.error("Last name is required");
            return;
        }
        if(email.trim()== ""){
            toast.error("Email is required");
            return;
        }
        if(password.trim()== ""){
            toast.error("Password is required");
            return;
        }   
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        if(password != confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
		try {
			await axios.post(
				import.meta.env.VITE_BACKENDURL+ "/users/",
				{
					email: email.trim(),
					password: password.trim(),
                    firstname: firstName.trim(),
                    lastname: lastName.trim(),
				}
			);
			console.log();
            navigate("/login");
			//alert("Login successful! Welcome back.");

			toast.success("Registration successful! Welcome to I computers.");
            setIsLoading(false);
		} catch (err) {
			//alert("Login failed! Please check your credentials and try again.");
			toast.error("Registration failed! Please check your data and try again.");
			console.log(err);
            setIsLoading(false);
		}
	}

	return (
    <div className="w-screen h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat relative flex">

        {/* Overlay for dark neon contrast */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0"></div>

        {/* LEFT SIDE - Branding */}
        <div className="w-[50%] h-full flex flex-col justify-center items-center relative z-10 px-8">
            <img
                src="/src/assets/logo.png"
                alt="logo"
                className="w-[220px] h-[220px] mb-6 object-contain drop-shadow-[0_0_30px_rgba(255,200,0,0.7)]"
            />
            <h1 className="text-[55px] font-extrabold text-center leading-tight
                           bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent
                           drop-shadow-[0_0_25px_rgba(255,200,0,0.7)]">
                Plug In. Power Up. Play Hard.
            </h1>
            <p className="text-[28px] text-white/90 italic mt-4 tracking-wide">
                Your Ultimate Destination for Gaming Gear
            </p>
        </div>

        {/* RIGHT SIDE - Registration Form */}
        <div className="w-[50%] h-full flex justify-center items-center relative z-10">
            <div className="w-[480px] h-[650px] backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.7)]
                            rounded-3xl flex flex-col justify-center items-center p-8 space-y-4
                            bg-white/10 border border-white/20 animate-[fadeIn_0.8s_ease-out]">

                <h1 className="text-4xl font-bold mb-4 tracking-wide
                               bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent
                               drop-shadow-[0_0_20px_rgba(255,200,0,0.6)]">
                    REGISTER
                </h1>

                {/* Floating Input: First Name */}
                <div className="w-full relative">
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="peer w-full h-[52px] px-4 bg-white/10 border border-white/30
                                   text-white rounded-lg placeholder-transparent
                                   focus:outline-none focus:ring-2 focus:ring-amber-400
                                   backdrop-blur-sm shadow-inner"
                        placeholder="First Name"
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 
                                      transition-all duration-300 pointer-events-none
                                      peer-placeholder-shown:top-1/2
                                      peer-placeholder-shown:text-white/60
                                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-amber-300">
                        First Name
                    </label>
                </div>

                {/* Floating Input: Last Name */}
                <div className="w-full relative">
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        className="peer w-full h-[52px] px-4 bg-white/10 border border-white/30
                                   text-white rounded-lg placeholder-transparent
                                   focus:outline-none focus:ring-2 focus:ring-amber-400
                                   backdrop-blur-sm shadow-inner"
                        placeholder="Last Name"
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 
                                      transition-all duration-300 pointer-events-none
                                      peer-placeholder-shown:top-1/2
                                      peer-placeholder-shown:text-white/60
                                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-amber-300">
                        Last Name
                    </label>
                </div>

                {/* Floating Input: Email */}
                <div className="w-full relative">
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full h-[52px] px-4 bg-white/10 border border-white/30
                                   text-white rounded-lg placeholder-transparent
                                   focus:outline-none focus:ring-2 focus:ring-amber-400
                                   backdrop-blur-sm shadow-inner"
                        placeholder="Email"
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 
                                      transition-all duration-300 pointer-events-none
                                      peer-placeholder-shown:top-1/2
                                      peer-placeholder-shown:text-white/60
                                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-amber-300">
                        Email
                    </label>
                </div>

                {/* Floating Input: Password */}
                <div className="w-full relative">
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer w-full h-[52px] px-4 bg-white/10 border border-white/30
                                   text-white rounded-lg placeholder-transparent
                                   focus:outline-none focus:ring-2 focus:ring-amber-400
                                   backdrop-blur-sm shadow-inner"
                        placeholder="Password"
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 
                                      transition-all duration-300 pointer-events-none
                                      peer-placeholder-shown:top-1/2
                                      peer-placeholder-shown:text-white/60
                                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-amber-300">
                        Password
                    </label>
                </div>

                {/* Floating Input: Confirm Password */}
                <div className="w-full relative">
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer w-full h-[52px] px-4 bg-white/10 border border-white/30
                                   text-white rounded-lg placeholder-transparent
                                   focus:outline-none focus:ring-2 focus:ring-amber-400
                                   backdrop-blur-sm shadow-inner"
                        placeholder="Confirm Password"
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 
                                      transition-all duration-300 pointer-events-none
                                      peer-placeholder-shown:top-1/2
                                      peer-placeholder-shown:text-white/60
                                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-amber-300">
                        Confirm Password
                    </label>
                </div>

                {/* Register Button */}
                <button
                    onClick={register}
                    className="w-full h-[52px] rounded-lg text-black font-semibold text-lg
                               bg-gradient-to-r from-amber-400 to-amber-600
                               hover:from-amber-500 hover:to-yellow-400
                               transition-all duration-200 shadow-lg hover:shadow-2xl
                               hover:scale-[1.03]"
                >
                    Register Now
                </button>

                {/* Already have account */}
                <p className="text-white text-sm mt-2">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-amber-300 hover:text-amber-400 transition"
                    >
                        Login here
                    </Link>
                </p>

            </div>
        </div>

        {isLoading && <Loader />}
    </div>
);}
