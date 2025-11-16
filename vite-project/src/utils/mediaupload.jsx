import { createClient } from "@supabase/supabase-js";

const url = "https://yoidbwjgljpgtmcnldbe.supabase.co";
const key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWRid2pnbGpwZ3RtY25sZGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTM4MjksImV4cCI6MjA3ODM2OTgyOX0.w_zv7k4NqfLtRemQk2YTLrbJmzRB5iAbmJxmTaMYnxE";

const supabase = createClient(url, key);

export default async function uploadFile(file) {
	try {
		const timeStamp = Date.now();
		const fileName = `${timeStamp}_${file.name}`;

		// --- Upload file ---
		const { data, error } = await supabase.storage
			.from("project bucket")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
				contentType: file.type
			});

		if (error) throw error;

		// --- Get public URL ---
		const { data: urlData } = supabase.storage
			.from("project bucket")
			.getPublicUrl(fileName);

		return urlData.publicUrl;
	} catch (err) {
		console.error("Upload failed:", err.message);
		throw err;
	}
}
