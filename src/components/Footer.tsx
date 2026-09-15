import { BUSINESS, SEO } from '../data/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pb-20 md:pb-0" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl" aria-hidden="true">🍕</span>
              <div>
                <span className="block text-lg font-bold text-white">{BUSINESS.name}</span>
                <span className="block text-xs text-red-400">{BUSINESS.nameHindi}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {SEO.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={BUSINESS.phoneTel} className="hover:text-white transition-colors flex items-center gap-2">
                  <span aria-hidden="true">📞</span> {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span aria-hidden="true">💬</span> WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <span>{BUSINESS.address}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location</a></li>
              <li>
                <a
                  href={BUSINESS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Get Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {currentYear} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            {BUSINESS.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
