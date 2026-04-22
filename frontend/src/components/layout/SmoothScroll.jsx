import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
    const { pathname } = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05,
            smoothWheel: true,
            wheelMultiplier: 1.1,
            smoothTouch: false,
        });
        
        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
