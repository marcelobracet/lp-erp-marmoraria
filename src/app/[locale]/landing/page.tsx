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

export default function LandingPage() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 1,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Animation frame loop
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
    <div className='min-h-screen bg-black text-white overflow-x-hidden'>
      <LandingHeader />
      <HeroVideo />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactForm />
    </div>
  );
}
