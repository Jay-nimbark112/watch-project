export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 flex justify-center">
      <div className="max-w-2xl w-full">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Contact Us
        </h1>

        <p className="text-gray-400 text-center mb-12">
          Have a question, suggestion, or business inquiry?  
          We’re here to help you.
        </p>

        {/* Contact Card */}
        <div className="border border-zinc-800 rounded-2xl p-8 bg-[#0a0a0a] space-y-6">

          {/* Email */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Email</h2>
            <a
              href="mailto:support@watchproject.com"
              className="text-gray-400 hover:text-white transition"
            >
              support@knightjay096@gmail.com
            </a>
          </div>

          {/* WhatsApp */}
          <div>
            <h2 className="text-lg font-semibold mb-2">WhatsApp</h2>
            <a
              href="https://wa.me/7778880049"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <p className="text-gray-400">
               India
            </p>
          </div>

        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          We usually respond within 24–48 hours.
        </p>

      </div>
    </main>
  );
}