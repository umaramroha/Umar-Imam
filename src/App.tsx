import Header from './components/Header';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import MenuSection from './components/MenuSection';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import CTA from './components/CTA';
import Location from './components/Location';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-red-700 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to menu
      </a>

      <Header />

      <main>
        <Hero />
        <QuickActions />
        <MenuSection />
        <WhyChooseUs />
        <About />
        <CTA />
        <Location />
      </main>

      <Footer />
      <MobileBottomBar />
      <WhatsAppButton />
    </div>
  );
}
