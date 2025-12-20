import { useState } from "react";
import { Await, Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";


export default function Loginpage(){



    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const googleLogin = useGoogleLogin({
		onSuccess: (response) => { 
            console.log(response);
			setIsLoading(true);
			axios.post(import.meta.env.VITE_BACKENDURL + "/users/google-login", {
				token: response.access_token,
			}).then((res) => {
				localStorage.setItem("token", res.data.token);
				if (res.data.role == "admin") {
					navigate("/admin");
				} else {
					navigate("/");
				}
				toast.success("Login successful!.");
				setIsLoading(false);
			}).catch((err) => {
				console.log(err);
			});
			setIsLoading(false);
		 },
		onError: () => { toast.error("Google Login Failed"); },
		onNonOAuthError: () => { toast.error("Google Login Failed"); },
	})


    async function login(){
        console.log("email -",email)
        console.log("password ",password)

        try{
        const res=await axios.post(import.meta.env.VITE_BACKENDURL + "/users/login", {
                "email": email,
                "password": password
        });
        console.log(res.data.token)
        toast.success("login successfull");
        localStorage.setItem("token", res.data.token);
        console.log(res.data.role);
        if(res.data.role=="admin"){
        navigate("/admin");
        }
        navigate("/products");
        

    } 
    catch(err){
        console.log("error during login");
        console.log(err);
        toast.error("error occured"); 
    }

    }

    return (
    <div className="w-screen h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex relative">

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* LEFT SIDE */}
        <div className="w-[50%] h-full flex flex-col justify-center items-center relative z-10 text-white px-6">
            <img
                src="/logo.png"
                className="object-contain mb-6 w-[40%] drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
            />

            <h1 className="text-[55px] font-extrabold text-center leading-tight
                           bg-gradient-to-r from-white to-white bg-clip-text text-transparent
                           drop-shadow-[0_0_25px_rgba(0,0,0,0)]">
                Plug in. Power up. Play hard.
            </h1>

            <p className="text-lg mt-4 opacity-90 tracking-wide">
                The future of gaming begins here ⚡
            </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[50%] h-full flex justify-center items-center relative z-10">
            <div className="w-[450px] h-[620px] rounded-2xl p-8 flex flex-col items-center
                            justify-center space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.7)]
                            bg-white/10 border border-white/20 backdrop-blur-2xl
                            animate-[fadeIn_0.8s_ease-out]">

                <h2 className="text-4xl font-bold mb-4 tracking-wide 
                               bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
                    WELCOME BACK
                </h2>

                {/* Floating Input */}
                <div className="w-full relative">
                    <input
                        onChange={(e) => setemail(e.target.value)}
                        type="email"
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
                        Enter Email
                    </label>
                </div>

                {/* Floating Input */}
                <div className="w-full relative">
                    <input
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        className="peer w-full h-[52px] px-4 bg-white/10 border border-white/30
                                   text-white rounded-lg placeholder-transparent
                                   focus:outline-none focus:ring-2 focus:ring-amber-400
                                   backdrop-blur-sm shadow-inner"
                        placeholder="Password"
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 
                                      transition-all duration-300 pointer-events-none
                                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-amber-300">
                        Enter Password
                    </label>
                </div>

                <Link
                    to={"/forgot-password"}
                    className="text-amber-300 hover:text-amber-400 transition font-medium"
                >
                    Forgot password?
                </Link>

                {/* MAIN LOGIN BUTTON */}
                <button
                    onClick={login}
                    className="w-full h-[52px] rounded-lg text-black font-semibold text-lg
                               bg-gradient-to-r from-amber-400 to-amber-600
                               hover:from-amber-500 hover:to-yellow-400
                               transition-all duration-200 shadow-lg hover:shadow-2xl
                               hover:scale-[1.03]"
                >
                    Login
                </button>

                {/* GOOGLE LOGIN */}
                <button
                    onClick={googleLogin}
                    className="w-full h-[52px] rounded-lg text-white font-semibold text-lg
                               bg-amber-50 hover:bg-amber-100 transition shadow-md hover:shadow-xl
                               hover:scale-[1.03]"
                >
                    Login with Google
                </button>

                <h2 className="text-white text-sm mt-4">
                    Don't have an account?{" "}
                    <Link
                        to={"/register"}
                        className="text-amber-300 hover:text-amber-400 transition"
                    >
                        Register now
                    </Link>
                </h2>
            </div>
        </div>
    </div>
);}
