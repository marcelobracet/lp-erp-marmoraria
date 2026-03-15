import LandingHeader from '@/components/landing/LandingHeader';
import HeroVideo from '@/components/landing/HeroVideo';
import AboutSection from '@/components/landing/AboutSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import FloatingWhatsAppButton from '@/components/landing/FloatingWhatsAppButton';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-[#050a30] text-[#f4f6fc] overflow-x-hidden'>
      <LandingHeader />
      <HeroVideo />
      <AboutSection />
      <FeaturesSection />
      <PricingSection />
      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
}
