'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroVideo from '@/components/landing/HeroVideo';
import AboutSection from '@/components/landing/AboutSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import ContactForm from '@/components/landing/ContactForm';
import FloatingWhatsAppButton from '@/components/landing/FloatingWhatsAppButton';

export default function LandingPage() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Animation frame lop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className='min-h-screen bg-[#050a30] text-[#f4f6fc] overflow-x-hidden'>
      <LandingHeader />
      <HeroVideo />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactForm />
      <FloatingWhatsAppButton />
    </div>
  );
}
