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
    const googleLogin = useGoogleLogin({
		onSuccess: (response) => { 
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
        navigate("/products");
        

    } 
    catch(err){
        console.log("error during login");
        console.log(err);
        toast.error("error occured"); 
    }

    }

    return(
        <div className="w-screen h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex ">
            <div className="w-[50%] h-full flex flex-col justify-center items-center">
                <img src="/src/assets/react.svg" className="object-cover m-3.5 w-[30%] flex h-[250px]"/>
                <h1 className="text-[50px] ">Plug in . Power up . Play hard.</h1>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col items-center p-2 justify-center">
                    <h2 className="text-2xl">LOGIN</h2>
                    
                    <input 
                    onChange={(e)=>{
                        setemail(e.target.value)
                        console.log("input field change")
                    }} 
                     type="email" placeholder="enter email" className="w-full h-[50px] mb-[20px] p-1.5 border-2 border-black text-accent text-shadow-white focus:outline-none focus:ring-2 focus:ring-amber-500 "></input>
                    <input 
                    onChange={(e)=>{
                        setpassword(e.target.value)
                        console.log("input field change")
                    }}
                    type="password" placeholder="enter password" className="w-full h-[50px] mb-[20px] p-1.5 border-2 border-black text-accent text-shadow-white focus:outline-none focus:ring-2 focus:ring-amber-500 "></input>

                    <button onClick={login} className="w-full h-[50px] bg-amber-500 text-secondary hover:bg-blue-600">Login</button>

                    <button onClick={googleLogin} className="mt-2 w-full h-[50px] bg-amber-500 text-secondary hover:bg-blue-600">Login with Google</button>
                    
                    <h2 className="text-white text-1xl italic">don't have an account? <Link to={"/register"} className="not-italic">Register now</Link></h2>

                </div>
            </div>
        </div>
    )
}