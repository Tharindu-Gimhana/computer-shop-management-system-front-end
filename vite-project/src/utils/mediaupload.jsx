import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const url = "https://yoidbwjgljpgtmcnldbe.supabase.co";
const key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWRid2pnbGpwZ3RtY25sZGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTM4MjksImV4cCI6MjA3ODM2OTgyOX0.w_zv7k4NqfLtRemQk2YTLrbJmzRB5iAbmJxmTaMYnxE";

const supabase = createClient(url, key);

export default function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const timeStamp = Date.now();
		const fileName = timeStamp + "_" + file.name;
		supabase.storage.from("images").upload(fileName, file, {
			cacheControl: "3600",
			upsert: false,
		}).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);
            }
        ).catch((error)=>{
            reject(error);
        })
	});
}