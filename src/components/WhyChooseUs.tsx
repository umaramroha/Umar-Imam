export default function WhyChooseUs() {
  const reasons = [
    {
      icon: '🍕',
      title: 'Fresh & Made to Order',
      description: 'Every dish is prepared fresh when you order — no pre-made shortcuts.',
    },
    {
      icon: '💰',
      title: 'Affordable Prices',
      description: 'Quality food at prices that won\'t burn a hole in your pocket.',
    },
    {
      icon: '⚡',
      title: 'Quick Service',
      description: 'Fast preparation so you get your food without long waits.',
    },
    {
      icon: '📞',
      title: 'Easy Ordering',
      description: 'Just call us — no apps, no complicated processes. Simple and direct.',
    },
    {
      icon: '🌿',
      title: 'Veg & Non-Veg',
      description: 'A wide variety of vegetarian and non-vegetarian choices for everyone.',
    },
    {
      icon: '🏠',
      title: 'Local Favorite',
      description: 'Trusted by families and food lovers across Amroha.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-700 mb-2">Why Us</span>
          <h2 id="why-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Choose Royal Food Court?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white rounded-xl p-5 border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0" aria-hidden="true">{reason.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{reason.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
