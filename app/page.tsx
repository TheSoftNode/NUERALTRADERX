"use client";

import { useEffect, useState } from 'react';
import HeroSection from '@/components/Landing/HeroSection';
import TrustedByTraders from '@/components/Landing/TrustedByTraders';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import HowItWorksSection from '@/components/Landing/HowItWorksSection';
import PricingSection from '@/components/Landing/PricingSection';
import CTASection from '@/components/Landing/CTASection';
import FAQSection from '@/components/Landing/FAQSection';


export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) return null;

  return (
    <div>
      <HeroSection />
      <TrustedByTraders />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}