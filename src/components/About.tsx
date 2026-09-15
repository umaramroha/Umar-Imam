export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-700 mb-2">About Us</span>
            <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your Neighborhood Food Court
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-100">
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                Royal Food Court is a local food destination in Amroha serving popular favorites including pizza, burgers, sandwiches, momos and other fast-food options.
              </p>
              <p>
                Our goal is to make ordering simple and convenient — choose your favorite food and call us to place your order.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">What we serve</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { emoji: '🍕', label: 'Pizza' },
                  { emoji: '🍔', label: 'Burgers' },
                  { emoji: '🥪', label: 'Sandwiches' },
                  { emoji: '🥟', label: 'Momos' },
                  { emoji: '🍝', label: 'Fast Food' },
                ].map((item) => (
                  <span key={item.label} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700">
                    <span aria-hidden="true">{item.emoji}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
