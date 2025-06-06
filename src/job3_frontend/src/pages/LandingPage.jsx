import React, { useEffect } from 'react'

import Lenis from "@studio-freight/lenis";

import { Section1 } from '../components/organisms/landing/Section1'
import { Section2 } from '../components/organisms/landing/Section2'
import { Section3 } from '../components/organisms/landing/Section3';
import { Section4 } from '../components/organisms/landing/Section4';
import { Section5 } from '../components/organisms/landing/Section5';
import { Section6 } from '../components/organisms/landing/Section6';
import { Section7 } from '../components/organisms/landing/Section7';
import { Section8 } from '../components/organisms/landing/Section8';

export const LandingPage = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
    return (
        <div>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
        </div>
    )
}
