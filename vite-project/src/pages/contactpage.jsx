import { Mail, Phone, MapPin } from "lucide-react";

export default function Contactpage() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 mt-24">
      <div className="w-full max-w-5xl bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl text-white p-8 grid md:grid-cols-2 gap-8">

        {/* Left Side - Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Contact Infinity Computers</h1>
          <p className="text-white/80">
            Have questions about laptops, accessories, or custom builds?  
            Reach out to us — we’re happy to help.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-pink-300" />
              <span>infinitycomputers@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-pink-300" />
              <span>+94 77 123 4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-pink-300" />
              <span>Hambantota, Sri Lanka</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <form className="space-y-4">
          <h2 className="text-2xl font-semibold">Send us a message</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition font-semibold"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}
