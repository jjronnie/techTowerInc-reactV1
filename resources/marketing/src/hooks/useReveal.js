import { useEffect, useRef } from 'react';

export const useReveal = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Force reflow so the browser registers the initial hidden state
        // before we start the transition to visible
        el.offsetHeight;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.05 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
};
