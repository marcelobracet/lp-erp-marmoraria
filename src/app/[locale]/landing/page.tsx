import LandingHeader from '@/components/landing/LandingHeader';
import HeroVideo from '@/components/landing/HeroVideo';
import AboutSection from '@/components/landing/AboutSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import ContactForm from '@/components/landing/ContactForm';
import FloatingWhatsAppButton from '@/components/landing/FloatingWhatsAppButton';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-[#050a30] text-[#f4f6fc] overflow-x-hidden'>
      <LandingHeader />
      <HeroVideo />
      <AboutSection />
      <FeaturesSection />
      {/* <TestimonialsSection /> */}
      <PricingSection />
      {/* <ContactForm /> */}
      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
}
