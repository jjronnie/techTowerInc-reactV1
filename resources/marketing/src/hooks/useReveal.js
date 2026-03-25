import { useEffect, useRef } from 'react';

export const useReveal = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold: options.threshold ?? 0.15 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [options.threshold]);

    return ref;
};
