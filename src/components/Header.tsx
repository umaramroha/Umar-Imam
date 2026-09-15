import { useState } from 'react';
import { BUSINESS } from '../data/constants';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
              R
            </div>
            <div className="leading-tight">
              <span className="block text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                {BUSINESS.name}
              </span>
              <span className="block text-[10px] sm:text-xs text-red-700 font-medium">
                {BUSINESS.nameHindi}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-700 rounded-lg hover:bg-red-50/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href={BUSINESS.phoneTel}
              className="hidden sm:inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              aria-label="Call to order"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-red-700 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-2 pb-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-2 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50/50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BUSINESS.phoneTel}
              className="mt-2 flex items-center justify-center gap-2 bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              📞 Call to Order — {BUSINESS.phone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
