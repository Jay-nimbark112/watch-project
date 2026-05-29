export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 flex justify-center">
      <div className="max-w-3xl w-full">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          About Us
        </h1>

        {/* Intro */}
        <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center">
          Welcome to <span className="text-white font-semibold">Limited Timepiece</span> — your destination for
          carefully curated premium watches at the best value.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            We aim to help users discover high-quality watches from trusted brands in one place.
            Our platform is designed to simplify your shopping experience with clean collections
            and direct product discovery.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
          <p className="text-gray-400 leading-relaxed">
            We collect and showcase watches from different brands and categories,
            making it easier for you to compare and choose the perfect style.
            We may use affiliate links to recommend products we believe in.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why Trust Us?</h2>
          <p className="text-gray-400 leading-relaxed">
            We focus on transparency, simplicity, and user experience.
            No clutter, no confusion — just a clean browsing experience.
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
         Limited Timepiece © {new Date().getFullYear()}. All rights reserved.
        </div>

      </div>
    </main>
  );
}