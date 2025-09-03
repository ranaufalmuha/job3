import React, { useEffect } from 'react'

import Lenis from "@studio-freight/lenis";

import { LandingSection1 } from '../components/organisms/landing/LandingSection1'
import { LandingSection2 } from '../components/organisms/landing/LandingSection2'
import { LandingSection3 } from '../components/organisms/landing/LandingSection3';
import { LandingSection4 } from '../components/organisms/landing/LandingSection4';
import { LandingSection5 } from '../components/organisms/landing/LandingSection5';
import { LandingSection6 } from '../components/organisms/landing/LandingSection6';
import { LandingSection7 } from '../components/organisms/landing/LandingSection7';
import { LandingSection8 } from '../components/organisms/landing/LandingSection8';
import { LandingSection9 } from '../components/organisms/landing/LandingSection9';

export const LandingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

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
            <LandingSection1 />
            <LandingSection2 />
            <LandingSection3 />
            <LandingSection4 />
            <LandingSection5 />
            <LandingSection6 />
            <LandingSection7 />
            <LandingSection8 />
            <LandingSection9 />
        </div>
    )
}
