'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Global GSAP defaults — tight, consistent with design system
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.6,
  });
  // Force3D on everything — GPU accelerate by default
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Lenis — ultra smooth lerp
    const lenis = new Lenis({
      lerp: 0.055,              // buttery smooth. Lower = more damped
      smoothWheel: true,
      wheelMultiplier: 0.85,    // slightly softer wheel response
      touchMultiplier: 1.4,
      syncTouch: false,
      syncTouchLerp: 0.075,
      autoRaf: false,
    });

    // Sync ScrollTrigger with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis raf from GSAP ticker — single animation loop
    const rafLoop = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafLoop);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts load (prevents measurement drift)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      gsap.ticker.remove(rafLoop);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
