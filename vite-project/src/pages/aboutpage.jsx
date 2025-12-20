export default function Aboutpage() {
  return (
    <div className="min-h-[calc(100vh-100px)] mt-32 px-6 lg:px-20 text-white">

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          About <span className="text-amber-400">Infinity Computers</span>
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Your trusted destination for high-performance computers, laptops,
          and premium accessories — built for professionals, gamers, and
          everyday users.
        </p>
      </div>

      {/* Glass Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-400 mb-3">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Infinity Computers is a modern computer shop delivering reliable
            technology solutions. From custom PCs to branded laptops, we focus
            on quality, performance, and customer trust.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-400 mb-3">
            What We Sell
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We offer desktops, laptops, monitors, RAM, storage, keyboards,
            mice, headsets, and all essential accessories from trusted brands
            — all in one place.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-400 mb-3">
            Why Choose Us
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Competitive pricing, genuine products, expert advice, and reliable
            after-sales support make us the smart choice for your tech needs.
          </p>
        </div>

      </div>

      {/* Mission Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-xl mb-20 items-center">
        <h2 className="text-3xl font-bold mb-4 text-amber-400">
          Our Mission
        </h2>
        <p className="text-gray-300 leading-relaxed text-center max-w-4xl">
          Our mission is to empower individuals and businesses with dependable
          technology solutions. We aim to simplify the buying experience while
          delivering high-quality products that enhance productivity, gaming,
          and creativity.
        </p>
      </div>

      {/* Footer Quote */}
      <div className="text-center pb-10">
        <p className="italic text-gray-400">
          “Technology should work for you — not against you.”
        </p>
        <p className="mt-2 text-amber-400 font-semibold">
          — Infinity Computers
        </p>
      </div>

    </div>
  );
}
