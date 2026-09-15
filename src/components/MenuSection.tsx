import { useState } from 'react';
import { menuItems, categories, type Category } from '../data/menu';
import { BUSINESS } from '../data/constants';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems.filter(item => item.available)
    : menuItems.filter(item => item.category === activeCategory && item.available);

  const getCategoryCount = (cat: Category) => {
    if (cat === 'All') return menuItems.filter(i => i.available).length;
    return menuItems.filter(i => i.category === cat && i.available).length;
  };



  return (
    <section id="menu" className="py-12 sm:py-16 bg-white" aria-labelledby="menu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-700 mb-2">Our Menu</span>
          <h2 id="menu-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
            What Would You Like Today?
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Fresh ingredients, bold flavors — made to order just for you
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide" role="tablist" aria-label="Menu categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
              <span className="ml-1 text-xs opacity-70">({getCategoryCount(cat)})</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-red-200 hover:shadow-sm transition-all"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {/* Category tag */}
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded mb-1.5">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    {/* Veg/Non-veg indicator */}
                    <div className="shrink-0 mt-1">
                      <span
                        className={`inline-block w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                          item.veg ? 'border-green-600' : 'border-red-600'
                        }`}
                        aria-label={item.veg ? 'Vegetarian' : 'Non-vegetarian'}
                      >
                        <span className={`block w-2 h-2 rounded-full ${
                          item.veg ? 'bg-green-600' : 'bg-red-600'
                        }`} />
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.size && (
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          {item.size}
                        </span>
                      )}
                      {item.price !== null ? (
                        <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Call for price</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order CTA */}
                <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50/50">
                  <a
                    href={BUSINESS.phoneTel}
                    className="flex items-center justify-center gap-1.5 w-full text-red-700 hover:text-white hover:bg-red-700 text-sm font-semibold py-1.5 rounded-md transition-colors"
                    aria-label={`Order ${item.name} by phone`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    📞 Order Now
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No items available in this category.</p>
            <p className="text-sm mt-1">Call us to know more about our offerings.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 text-center bg-gray-50 rounded-xl p-6 border border-gray-100">
          <p className="text-gray-700 font-medium mb-1">
            Ready to order?
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Just give us a call — it's the quickest way to get your food!
          </p>
          <a
            href={BUSINESS.phoneTel}
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
